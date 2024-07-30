import { DefinitionType, Progress, UUID } from 'lib/constants';
import { Entity } from './entity.model';
import { NameBase } from './id-base.model';
import { Definition, definitionName, Word } from './word.model';
import { maskOrHighlight } from 'lib/utils';
import { signal } from '@angular/core';

export const enum AnimState {

	active = 'active',
	inactive = 'inactive'

}

type Index = number;

export interface QuizProgress extends Entity {

	next: number;
	level: Progress;

}

export class Quiz {

	askWord: boolean;
	isVerb: boolean;

	word: Word;
	definition: Definition;

	choices: Word[];

	private correctIndex: Index = -1;

	correctChoice = signal<Index | null>(null);
	incorrectChoice = signal<Index | null>(null);

	constructor(public words: Word[]) {

		// What to ask; word or definition?
		const askWord = Math.random() < 0.5;
		this.askWord = askWord;

		const word = words[0];
		const definition = word.definitions[0];

		this.word = word;
		this.definition = definition;
		this.isVerb = definition.type === DefinitionType.verb;

		this.choices = [...words].sort(() => Math.random() - 0.5); // shuffle
		this.correctIndex = this.choices.findIndex(w => w.id === this.word.id);

	}

	onClick(index: Index): void {

		if (index === this.correctIndex) {

			this.correctChoice.set(index);
			this.incorrectChoice.set(null);

		} else {

			this.correctChoice.set(this.correctIndex);
			this.incorrectChoice.set(index);

		}

	}

	onRightAnswer(choiceId: UUID): boolean {

		return this.definition.id === choiceId;

	}

}
