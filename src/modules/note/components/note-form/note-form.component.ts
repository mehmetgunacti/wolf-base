import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Note, TAG_PINNED, UUID } from 'lib';
import { Subject } from 'rxjs';
import { EditFormImpl, NOTE_FORM, NoteForm } from './note-form';

@Component({
	selector: 'app-note-form',
	templateUrl: './note-form.component.html',
	styleUrls: ['./note-form.component.scss'],
	providers: [{ provide: NOTE_FORM, useClass: EditFormImpl }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormComponent implements OnInit, OnChanges, OnDestroy {

	TAG_PINNED = TAG_PINNED;

	@Input() note: Note | null | undefined;
	@Input() nodes: Note[] | null | undefined = [];
	@Input() tagSuggestions: string[] | null | undefined;

	@Output() create: EventEmitter<Partial<Note>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, note: Partial<Note> }> = new EventEmitter();
	@Output() tagInput: EventEmitter<string | null> = new EventEmitter();

	form: NoteForm = inject(NOTE_FORM);
	tagSuggestions$: Subject<string[]>;

	constructor() {

		this.tagSuggestions$ = new Subject<string[]>();

	}

	ngOnInit(): void { }

	ngOnChanges(changes: SimpleChanges): void {

		const note: Note = changes['note']?.currentValue;
		if (note)
			this.form.setValues(note);

		const tagSuggestions: string[] = changes['tagSuggestions']?.currentValue;
		if (tagSuggestions)
			this.tagSuggestions$.next(tagSuggestions);

	}

	ngOnDestroy(): void { }

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
