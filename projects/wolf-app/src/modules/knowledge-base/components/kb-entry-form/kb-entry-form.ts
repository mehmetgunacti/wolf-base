import { InjectionToken } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormClass, FormClassImpl, KBEntry, UUID } from 'lib';
import { TreeNode } from 'lib';

interface EditForm {

	id: FormControl<string | null>;
	parentId: FormControl<TreeNode | null>;
	name: FormControl<string>;
	urls: FormArray<FormControl<string | null>>;
	popular: FormControl<boolean>;

}

export interface KBEntryForm extends EditForm, FormClass<KBEntry> {

	addURL(): void;
	removeURL(idx: number): void;
	togglePopular(): void;

}

export const KB_ENTRY_FORM = new InjectionToken<KBEntryForm>('KBEntryForm');

export class EditFormImpl extends FormClassImpl<KBEntry> implements KBEntryForm {

	protected override createFormGroup(): FormGroup<EditForm> {

		return new FormGroup<EditForm>({
			id: new FormControl(),
			parentId: new FormControl(),
			name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
			urls: new FormArray([
				new FormControl('')
			]),
			popular: new FormControl()
		});

	}

	override setValues(kbEntry: KBEntry): void {

		// this.id.setValue(bookmark.id, { emitEvent: false });
		// this.name.setValue(bookmark.name, { emitEvent: false });
		// this.title.setValue(bookmark.title, { emitEvent: false });
		// this.tags.setValue(bookmark.tags, { emitEvent: false });
		// this.image.setValue(bookmark.image ?? null, { emitEvent: false });
		// this.clicks.setValue(bookmark.clicks, { emitEvent: false });

		// // set urls
		// bookmark.urls.forEach((url, idx) => this.handleUrl(this.urls, idx, url))

	}

	override get value(): KBEntry {

		const kbEntry: Partial<KBEntry> = this._formGroup.value;
		return {

			...kbEntry,
			parentId: this.parentId.value?.key ?? null

		} as KBEntry;

	}

	addURL(): void {

		this.urls.push(new FormControl(null, { validators: [Validators.required], nonNullable: true }));

	}

	removeURL(idx: number): void {

		this.urls.removeAt(idx);

	}

	togglePopular(): void {

		this.popular.setValue(!this.popular.getRawValue());

	}

	get id(): FormControl<UUID | null> {
		return <FormControl<UUID>>this._formGroup.controls['id'];
	}

	get parentId(): FormControl<TreeNode | null> {
		return <FormControl<TreeNode>>this._formGroup.controls['parentId'];
	}

	get name(): FormControl<string> {
		return <FormControl<string>>this._formGroup.controls['name'];
	}

	get urls(): FormArray {
		return <FormArray>this._formGroup.controls['urls'];
	}

	get popular(): FormControl<boolean> {
		return <FormControl<boolean>>this._formGroup.controls['popular'];
	}

}
