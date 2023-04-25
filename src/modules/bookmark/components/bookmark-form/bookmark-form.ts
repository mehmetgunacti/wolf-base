import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Bookmark, UUID } from 'lib';
import { IFormClass } from 'modules/shared';

export class EditForm implements IFormClass<Bookmark> {

	private _formGroup: FormGroup;

	constructor(bookmark: Bookmark | null | undefined) {

		this._formGroup = new FormGroup({
			id: new FormControl(),
			name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
			title: new FormControl('', { validators: [Validators.required], nonNullable: true }),
			tags: new FormControl([], { validators: [Validators.required], nonNullable: true }),
			image: new FormControl(''),
			url: new FormControl([''], { validators: [Validators.required], nonNullable: true }),
			clicks: new FormControl(0)
		});

		if (bookmark)
			this.setProperties(bookmark);

	}

	setProperties(bookmark: Bookmark): void {

		this.id.setValue(bookmark.id);
		this.name.setValue(bookmark.name);
		this.title.setValue(bookmark.title);
		this.tags.setValue(bookmark.tags);
		this.image.setValue(bookmark.image);
		this.url.setValue(bookmark.url);
		this.clicks.setValue(bookmark.clicks);

	}

	get id(): FormControl<UUID | null> {
		return <FormControl<UUID>> this._formGroup.controls['id'];
	}

	get name(): FormControl<string> {
		return <FormControl<string>> this._formGroup.controls['name'];
	}

	get title(): FormControl<string> {
		return <FormControl<string>> this._formGroup.controls['title'];
	}
	
	get tags(): FormControl<string[]> {
		return <FormControl<string[]>> this._formGroup.controls['tags'];
	}
	
	get image(): FormControl<string | null> {
		return <FormControl<string | null>> this._formGroup.controls['image'];
	}
	
	get url(): FormControl<string[]> {
		return <FormControl<string[]>> this._formGroup.controls['url'];
	}

	get clicks(): FormControl<number> {
		return <FormControl<number>> this._formGroup.controls['clicks'];
	}

	get formGroup(): FormGroup {
		return this._formGroup;
	}

}