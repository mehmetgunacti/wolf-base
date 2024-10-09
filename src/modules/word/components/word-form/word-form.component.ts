import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, untracked } from '@angular/core';
import { UUID, Word } from 'lib';
import { DEFINITION_LANGUAGES, DEFINITION_TYPES } from 'lib/constants/word.constant';
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

	protected isUpdate = computed(() => !!this.word()?.id);

	create = output<Partial<Word>>();
	update = output<{ id: UUID, word: Partial<Word> }>();

	protected form: WordForm = inject(WORD_FORM);

	constructor() {

		effect(() => {

			const word = this.word();
			if (word)
				untracked(() => this.form.populate(word));

		});

	}

	onSave(): void {

		console.log('onSave()');

		const word: Partial<Word> = this.form.fgWord.value as Partial<Word>;
		if (word.id)
			this.update.emit({ id: word.id, word });
		else
			this.create.emit(word);

	}

}
