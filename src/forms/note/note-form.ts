import { InjectionToken } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { Note } from '@models/note.model';
import { fc, fg, nnfc } from '@utils/form.util';

interface NoteFormSchema {

	id: FormControl<string | null>;
	name: FormControl<string>;
	parentId: FormControl<string | null>;
	tags: FormControl<string[]>;

}

function createFormGroup(value?: Note): FormGroup<NoteFormSchema> {

	const {

		id = null,
		name = '',
		parentId = null,
		tags = []

	} = value ?? {};

	return fg<NoteFormSchema>({

		id: fc(id),
		name: nnfc(name, Validators.required),
		parentId: fc(parentId),
		tags: nnfc(tags, Validators.required)

	});

}

export class NoteFormImpl {

	fg: FormGroup<NoteFormSchema> = createFormGroup();

	populate(entity: Note): void {

		const fg = this.fg;
		const { id, name, parentId, tags } = entity;

		// populate (non-array values)
		fg.patchValue({ id, name, parentId, tags });

	}

	get id(): FormControl<UUID | null> { return this.fg.controls.id; }
	get name(): FormControl<string> { return this.fg.controls.name; }
	get parentId(): FormControl<string | null> { return this.fg.controls.parentId; }
	get tags(): FormControl<string[]> { return this.fg.controls.tags; }

}

export const NOTE_FORM = new InjectionToken<NoteFormImpl>('NOTE_FORM');
