import { Component, computed, effect, inject, input, output, untracked } from '@angular/core';
import { DEFINITION_LANGUAGES, DEFINITION_TYPES, UUID } from '@constants';
import { BaseComponent, InputComponent, SelectComponent, TextareaComponent } from '@libComponents';
import { Word } from '@models';
import { WORD_FORM, WordForm } from './word-form';
import { ReactiveFormsModule } from '@angular/forms';
import { GlyphDirective } from '@directives';

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, InputComponent, GlyphDirective, TextareaComponent, SelectComponent ],
	selector: 'app-word-form',
	templateUrl: './word.form.html',
	providers: [ { provide: WORD_FORM, useClass: WordForm } ]
})
export class WordFormComponent extends BaseComponent {

	DEFINITION_LANGUAGES = DEFINITION_LANGUAGES;
	DEFINITION_TYPES = DEFINITION_TYPES;

	/* @Input() */
	word = input<Word | null>(null);

	protected isUpdate = computed(() => !!this.word()?.id);

	create = output<Partial<Word>>();
	update = output<{ id: UUID, word: Partial<Word>; }>();

	protected form: WordForm = inject(WORD_FORM);

	constructor() {

		super();
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
