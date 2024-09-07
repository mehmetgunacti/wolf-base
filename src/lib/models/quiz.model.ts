import { signal } from '@angular/core';
import { DefinitionType, Progress, UUID } from 'lib/constants';
import { Entity } from './entity.model';
import { Definition, Word } from './word.model';

/*
* Fisher-Yates (or Knuth) algorithm
* iterates over the array from the last element to the first,
* swapping each element with a randomly chosen element that comes before it (including itself)
*/
function shuffle(array: Word[]): Word[] {

	for (let i = array.length - 1; i > 0; i--) {

		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];

	}
	return array;

}

export const enum AnimState {

	active = 'active',
	inactive = 'inactive'

}

type Index = number;

export interface QuizEntry extends Entity {

	next: number;
	level: Progress;
	question: 'term' | 'definition';

}

export class Quiz {

	askWord: boolean;

	word: Word;
	definition: Definition;

	choices: Word[];

	private correctIndex: Index = -1;

	correctChoice = signal<Index | null>(null);
	incorrectChoice = signal<Index | null>(null);

	constructor(public words: Word[]) {

		// What to ask; word (term) or definition?
		const askWord = Math.random() < 0.5;
		this.askWord = askWord;

		const word = words[0];
		const definition = word.definitions[0];

		this.word = word;
		this.definition = definition;

		this.choices = [...shuffle(words)]; // [...words].sort(() => Math.random() - 0.5); // shuffle
		this.correctIndex = this.choices.findIndex(w => w.id === this.word.id);

	}

	onAnswer(index: Index): void {

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
