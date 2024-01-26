import { ChangeDetectionStrategy, Component, EventEmitter, Output, effect, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Note, TAG_PINNED, UUID, elseEmptyArray } from 'lib';
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
		effect(() => {

			const note = this.note();
			if (note)
				this.form.setValues(note);

		});

		// on incoming 'parentId' set form value
		effect(() => this.form.parentId.setValue(this.parentId()));

		// when user changes parentId using selectbox, update 'tags' form value
		const changedParentId = toSignal(this.form.parentId.valueChanges, { initialValue: this.parentId() });
		effect(() => {

			const newParentId = changedParentId();
			const tags = this.nodes().find(n => n.id === newParentId)?.tags ?? [];
			this.form.tags.setValue(tags);

		});

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
