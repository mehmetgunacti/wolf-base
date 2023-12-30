import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormClass, FormClassImpl, Note, UUID } from '@lib';

interface EditForm {

	id: FormControl<string | null>;
	name: FormControl<string>;
	parentId: FormControl<string | null>;
	tags: FormControl<string[]>;

}

export interface NoteForm extends EditForm, FormClass<Note> { }

export const NOTE_FORM = new InjectionToken<NoteForm>('NoteForm');

export class EditFormImpl extends FormClassImpl<Note> implements NoteForm {

	protected override createFormGroup(): FormGroup<EditForm> {

		return new FormGroup<EditForm>({

			id: new FormControl(),
			name: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
			parentId: new FormControl(),
			tags: new FormControl([], { validators: [Validators.required], nonNullable: true })

		});

	}

	override setValues(note: Note): void {

		this.id.setValue(note.id); // , { emitEvent: false });
		this.name.setValue(note.name); // , { emitEvent: false });
		this.parentId.setValue(note.parentId); // , { emitEvent: false });
		this.tags.setValue(note.tags); // , { emitEvent: false });

	}

	override get value(): Note {

		const note: Note = this._formGroup.value;
		return note;

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
