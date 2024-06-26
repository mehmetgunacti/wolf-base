import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Word, TAG_PINNED, UUID, elseEmptyArray } from 'lib';
import { filter, tap } from 'rxjs';
import { EditFormImpl, WORD_FORM, WordForm } from './word-form';

@Component({
	selector: 'app-word-form',
	templateUrl: './word-form.component.html',
	styleUrls: ['./word-form.component.scss'],
	providers: [{ provide: WORD_FORM, useClass: EditFormImpl }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordFormComponent {

	TAG_PINNED = TAG_PINNED;

	/* @Input() */
	word = input<Word | null>(null);
	parentId = input<UUID | null>(null);
	nodes = input<Word[], Word[] | null>([], { transform: elseEmptyArray<Word> });
	tagSuggestions = input<string[], string[] | null>([], { transform: elseEmptyArray<string> });

	@Output() create: EventEmitter<Partial<Word>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, word: Partial<Word> }> = new EventEmitter();
	@Output() tagInput: EventEmitter<string | null> = new EventEmitter();

	form: WordForm = inject(WORD_FORM);

	constructor() {

		// on incoming 'word' set form values
		toObservable(this.word).pipe(

			takeUntilDestroyed(),
			filter((word): word is Word => word !== null),
			tap(word => this.form.setValues(word))

		).subscribe();

		// on incoming 'parentId' set form value
		toObservable(this.parentId).pipe(

			takeUntilDestroyed(),
			filter((id): id is UUID => id !== null),
			tap(id => this.form.parentId.setValue(id))

		).subscribe();

	}

	onCopyTags(): void {

		// const parentTags: string[] = this.nodes().find(n => n.id === this.form.parentId.value)?.tags ?? [];
		// const currentTags: string[] = this.form.tags.value;
		// this.form.tags.setValue([...currentTags, ...parentTags]);

	}

	onSave(): void {

		if (this.form.isInvalid())
			return;

		const word: Word = { ...this.form.value };
		if (word.id)
			this.update.emit({ id: word.id, word });
		else
			this.create.emit(word);

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
