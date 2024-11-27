import { InjectionToken } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { Note } from '@models/note.model';
import { fa, fc, fg, nnfc } from '@utils/form.util';

interface NoteFormSchema {

	id: FormControl<string | null>;
	name: FormControl<string>;
	parentId: FormControl<string | null>;
	urls: FormArray<FormControl<string>>;
	tags: FormControl<string[]>;

}

function createFormGroup(value?: Note): FormGroup<NoteFormSchema> {

	const {

		id = null,
		name = '',
		parentId = null,
		tags = [],
		urls = [ '' ]

	} = value ?? {};

	return fg<NoteFormSchema>({

		id: fc(id),
		name: nnfc(name, Validators.required),
		parentId: fc(parentId),
		tags: nnfc(tags, Validators.required),
		urls: fa(urls.map(c => nnfc(c, Validators.required)))

	});

}

export class NoteFormImpl {

	fg: FormGroup<NoteFormSchema> = createFormGroup();

	populate(entity: Note): void {

		const fg = this.fg;
		const { id, name, parentId, tags, urls } = entity;

		// populate (non-array values)
		fg.patchValue({ id, name, parentId, tags, urls });

		// populate urls
		const fa = fg.controls.urls;
		fa.clear();
		urls.forEach(context => fa.push(nnfc(context, Validators.required)));

	}

	addUrl(): void {

		this.urls.push(nnfc('', Validators.required));
		this.fg.updateValueAndValidity();

	}

	removeUrl(idx: number): void {

		this.urls.removeAt(idx);
		this.fg.updateValueAndValidity();

	}

	get id(): FormControl<UUID | null> { return this.fg.controls.id; }
	get name(): FormControl<string> { return this.fg.controls.name; }
	get parentId(): FormControl<string | null> { return this.fg.controls.parentId; }
	get tags(): FormControl<string[]> { return this.fg.controls.tags; }
	get urls(): FormArray<FormControl<string>> { return this.fg.controls.urls; }

}

export const NOTE_FORM = new InjectionToken<NoteFormImpl>('NOTE_FORM');
