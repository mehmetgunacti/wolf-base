import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Note, TAG_POPULAR, ToastConfiguration, UUID } from 'lib';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { EditFormImpl, NOTE_FORM, NoteForm } from './note-form';

@Component({
	selector: 'app-note-form',
	templateUrl: './note-form.component.html',
	styleUrls: ['./note-form.component.scss'],
	providers: [{ provide: NOTE_FORM, useClass: EditFormImpl }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteFormComponent implements OnInit, OnChanges, OnDestroy {

	@Input() note: Note | null | undefined;
	@Input() tagSuggestions: string[] | null | undefined;
	@Input() titleLookupUrl: string | null | undefined;

	@Output() create: EventEmitter<Partial<Note>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, note: Partial<Note> }> = new EventEmitter();
	@Output() remove: EventEmitter<UUID> = new EventEmitter();
	@Output() tagInput: EventEmitter<string | null> = new EventEmitter();
	@Output() titleLookup: EventEmitter<ToastConfiguration> = new EventEmitter();

	form: NoteForm = inject(NOTE_FORM);
	note$: Observable<Note>;
	tagSuggestions$: Subject<string[]>;

	constructor() {

		this.tagSuggestions$ = new Subject<string[]>();
		this.note$ = this.form.valueChanges$.pipe(

			debounceTime(200),
			distinctUntilChanged()

		);

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

		const note: Note = this.form.value;
		if (note.id)
			this.update.emit({ id: note.id, note });
		else
			this.create.emit(note);

	}

	onDelete(): void {

		if (!this.note)
			return;

		if (
			confirm(`
${this.note.name}

will be deleted. Continue?`)
		)
			this.remove.emit(this.note.id);

	}

	onTagInput(val: string | null): void {

		this.tagInput.emit(val);

	}

	onTogglePopular(): void {

		const tags: string[] = this.form.tags.value;
		this.form.tags.setValue(
			tags.includes(TAG_POPULAR) ? tags.filter(v => v !== TAG_POPULAR) : [TAG_POPULAR, ...tags]
		);
		this.form.tags.markAsDirty();
		this.form.tags.updateValueAndValidity();

	}

}
