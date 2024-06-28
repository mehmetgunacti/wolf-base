import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { UUID, Word, isInvalid } from 'lib';
import { DEFINITION_LANGUAGES, DEFINITION_TYPES } from 'lib/constants/word.constant';
import { filter, tap } from 'rxjs';
import { WORD_FORM, WordForm } from './word-form';

@Component({
	selector: 'app-word-form',
	templateUrl: './word-form.component.html',
	styleUrls: ['./word-form.component.scss'],
	providers: [{ provide: WORD_FORM, useClass: WordForm }],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordFormComponent {

	DEFINITION_LANGUAGES = DEFINITION_LANGUAGES;
	DEFINITION_TYPES = DEFINITION_TYPES;

	/* @Input() */
	word = input<Word | null>(null);

	@Output() create: EventEmitter<Partial<Word>> = new EventEmitter();
	@Output() update: EventEmitter<{ id: UUID, word: Partial<Word> }> = new EventEmitter();

	form: WordForm = inject(WORD_FORM);

	constructor() {

		// on incoming 'word' set form values
		toObservable(this.word).pipe(

			takeUntilDestroyed(),
			filter((word): word is Word => word !== null),
			tap(word => this.form.setValue(word))

		).subscribe();

	}

	onSave(): void {

		const formGroup = this.form.formGroup();
		if (isInvalid(formGroup))
			return;

		const word: Partial<Word> = formGroup.value as Partial<Word>;
		if (word.id)
			this.update.emit({ id: word.id, word });
		else
			this.create.emit(word);

	}

}
