import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Note, TAG_PINNED, UUID, elseEmptyArray } from 'lib';
import { filter, map, tap } from 'rxjs';
import { EditFormImpl, NOTE_FORM, NoteForm } from './note-form';

@Component({
	selector: 'app-note-form',
	templateUrl: './note-form.component.html',
	styleUrls: ['./note-form.component.scss'],
	providers: [{ provide: NOTE_FORM, useClass: EditFormImpl }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormComponent {

	TAG_PINNED = TAG_PINNED;

	/* @Input() */
	note = input<Note | null>(null);
	parentId = input<UUID | null>(null);
	nodes = input<Note[], Note[] | null>([], { transform: elseEmptyArray<Note> });
	tagSuggestions = input<string[], string[] | null>([], { transform: elseEmptyArray<string> });

	@Output() create: EventEmitter<Partial<Note>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, note: Partial<Note> }> = new EventEmitter();
	@Output() tagInput: EventEmitter<string | null> = new EventEmitter();

	form: NoteForm = inject(NOTE_FORM);

	constructor() {

		// on incoming 'note' set form values
		toObservable(this.note).pipe(

			takeUntilDestroyed(),
			filter((note): note is Note => note !== null),
			tap(note => this.form.setValues(note))

		).subscribe();

		// on incoming 'parentId' set form value
		toObservable(this.parentId).pipe(

			takeUntilDestroyed(),
			filter((id): id is UUID => id !== null),
			tap(id => this.form.parentId.setValue(id))

		).subscribe();

		// when user changes parentId using selectbox, update 'tags' form value
		this.form.parentId.valueChanges.pipe(

			takeUntilDestroyed(),
			map(parentId => this.nodes().find(n => n.id === parentId)?.tags ?? []),
			tap(tags => this.form.tags.setValue(tags))

		).subscribe();

	}

	onSave(): void {

		if (this.form.isInvalid())
			return;

		const note: Note = { ...this.form.value, modified: new Date().toUTCString() };
		if (note.id)
			this.update.emit({ id: note.id, note });
		else
			this.create.emit(note);

	}

	onTagInput(val: string | null): void {

		this.tagInput.emit(val);

	}

	onTogglePinned(): void {

		const tags: string[] = this.form.tags.value;
		this.form.tags.setValue(
			tags.includes(TAG_PINNED) ? tags.filter(tag => tag !== TAG_PINNED) : [TAG_PINNED, ...tags]
		);
		this.form.tags.markAsDirty();
		this.form.tags.updateValueAndValidity();

	}

}
