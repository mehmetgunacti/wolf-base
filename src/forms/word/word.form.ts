import { Component, computed, effect, inject, input, output, untracked } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UUID } from '@constants/common.constant';
import { DEFINITION_LANGUAGES, DEFINITION_TYPES } from '@constants/word.constant';
import { GlyphDirective } from '@directives/glyph.directive';
import { BaseComponent } from '@libComponents/base.component';
import { InputComponent } from '@libComponents/input/input.component';
import { SelectComponent } from '@libComponents/select/select.component';
import { TextareaComponent } from '@libComponents/textarea/textarea.component';
import { Word } from '@models/word.model';
import { WORD_FORM, WordForm } from './word-form';

@Component({
	standalone: true,
	imports: [ ReactiveFormsModule, InputComponent, GlyphDirective, TextareaComponent, SelectComponent ],
	selector: 'app-word-form',
	templateUrl: './word.form.html',
	providers: [ { provide: WORD_FORM, useClass: WordForm } ]
})
export class WordFormComponent extends BaseComponent {

	protected DEFINITION_LANGUAGES = DEFINITION_LANGUAGES;
	protected DEFINITION_TYPES = DEFINITION_TYPES;

	// Input
	word = input<Word | null>(null);

	// Output
	create = output<Partial<Word>>();
	update = output<{ id: UUID, word: Partial<Word>; }>();

	protected isUpdate = computed(() => !!this.word()?.id);
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
