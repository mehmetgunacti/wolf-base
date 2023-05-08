import { Injectable, InjectionToken } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Bookmark, UUID } from 'lib';
import { FormClass, FormClassImpl } from 'modules/shared';

interface EditForm {

	id: FormControl<string | null>;
	name: FormControl<string>;
	title: FormControl<string>;
	tags: FormControl<string[]>;
	image: FormControl<string | null>;
	urls: FormArray<FormControl<string>>;
	clicks: FormControl<number>;

}

export interface BookmarkForm extends EditForm, FormClass<Bookmark> {

	addURL(): void;
	removeURL(idx: number): void;

}

export const BOOKMARK_FORM = new InjectionToken<BookmarkForm>('BookmarkForm');

export class EditFormImpl extends FormClassImpl<Bookmark> implements BookmarkForm {

	protected override createFormGroup(): FormGroup<EditForm> {

		return new FormGroup<EditForm>({
			id: new FormControl(),
			name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
			title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
			tags: new FormControl([], { validators: [Validators.required], nonNullable: true }),
			image: new FormControl(''),
			urls: new FormArray([
				new FormControl('', { validators: [Validators.required], nonNullable: true })
			]),
			clicks: new FormControl(0, { nonNullable: true })
		});

	}

	setValues(bookmark: Bookmark): void {

		this.id.setValue(bookmark.id, { emitEvent: false });
		this.name.setValue(bookmark.name, { emitEvent: false });
		this.title.setValue(bookmark.title, { emitEvent: false });
		this.tags.setValue(bookmark.tags, { emitEvent: false });
		this.image.setValue(bookmark.image, { emitEvent: false });
		this.clicks.setValue(bookmark.clicks, { emitEvent: false });

		// set urls
		bookmark.urls.forEach((url, idx) => this.handleUrl(this.urls, idx, url))

	}

	private handleUrl(arr: FormArray, idx: number, value: string = ''): void {

		let fc = arr.at(idx) as FormControl;
		if (!fc) {

			fc = new FormControl(value, { validators: [Validators.required], nonNullable: true });
			arr.setControl(idx, fc);

		} else if (fc.value !== value)
			fc.setValue(value, { emitEvent: false });

	}

	override get value(): Bookmark {

		const bookmark: Partial<Bookmark> = this._formGroup.value;
		return {

			...bookmark

		} as Bookmark;

	}

	addURL(): void {

		this.urls.push(new FormControl(null, { validators: [Validators.required], nonNullable: true }));

	}

	removeURL(idx: number): void {
		
		this.urls.removeAt(idx);

	}

	get id(): FormControl<UUID | null> {
		return <FormControl<UUID>>this._formGroup.controls['id'];
	}

	get name(): FormControl<string> {
		return <FormControl<string>>this._formGroup.controls['name'];
	}

	get title(): FormControl<string> {
		return <FormControl<string>>this._formGroup.controls['title'];
	}

	get tags(): FormControl<string[]> {
		return <FormControl<string[]>>this._formGroup.controls['tags'];
	}

	get image(): FormControl<string | null> {
		return <FormControl<string | null>>this._formGroup.controls['image'];
	}

	get urls(): FormArray {
		return <FormArray>this._formGroup.controls['urls'];
	}

	get clicks(): FormControl<number> {
		return <FormControl<number>>this._formGroup.controls['clicks'];
	}

}