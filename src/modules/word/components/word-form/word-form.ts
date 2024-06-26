import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormClass, FormClassImpl, Word, UUID } from '@lib';

interface EditForm {

	id: FormControl<string | null>;
	name: FormControl<string>;
	parentId: FormControl<string | null>;
	tags: FormControl<string[]>;

}

export interface WordForm extends EditForm, FormClass<Word> { }

export const WORD_FORM = new InjectionToken<WordForm>('WordForm');

export class EditFormImpl extends FormClassImpl<Word> implements WordForm {

	protected override createFormGroup(): FormGroup<EditForm> {

		return new FormGroup<EditForm>({

			id: new FormControl(),
			name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
			parentId: new FormControl(),
			tags: new FormControl([], { nonNullable: true })

		});

	}

	override setValues(word: Word): void {

		this.id.setValue(word.id); // , { emitEvent: false });
		this.name.setValue(word.name); // , { emitEvent: false });
		// this.parentId.setValue(word.parentId); // , { emitEvent: false });
		// this.tags.setValue(word.tags); // , { emitEvent: false });

	}

	override get value(): Word {

		const word: Word = this._formGroup.value;
		return word;

	}

	get id(): FormControl<UUID | null> {
		return <FormControl<UUID>>this._formGroup.controls['id'];
	}

	get name(): FormControl<string> {
		return <FormControl<string>>this._formGroup.controls['name'];
	}

	get parentId(): FormControl<string | null> {
		return <FormControl<string | null>>this._formGroup.controls['parentId'];
	}

	get tags(): FormControl<string[]> {
		return <FormControl<string[]>>this._formGroup.controls['tags'];
	}

}
