import { DefinitionType, Progress, UUID } from 'lib/constants';
import { Entity } from './entity.model';
import { NameBase } from './id-base.model';
import { Word } from './word.model';

export interface QuizProgress extends Entity {

	next: number;
	level: Progress;

}

export class Quiz {

	question: NameBase;
	choices: NameBase[];
	showAnswer = false;

	constructor(public words: Word[]) {

		// What to ask; word or definition?
		const askWord = Math.random() < 0.5;

		const def = words[0].definitions[0];
		const isVerb = def.type === DefinitionType.verb;

		// prepare question
		this.question = {

			id: words[0].definitions[0].id,
			name: askWord ? `(${def.type})` + (isVerb ? ' to ' : ' ') + words[0].name : words[0].definitions[0].name

		};

		// prepare choices
		const tmpChoices: NameBase[] = [];
		const tmpWords = [...words].sort(() => Math.random() - 0.5); // shuffle
		tmpWords.forEach(w => tmpChoices.push({

			id: w.definitions[0].id,
			name: askWord ? w.definitions[0].name : w.name

		}));
		this.choices = tmpChoices;

	}

	onRightAnswer(choiceId: UUID): boolean {

		if (this.question.id !== choiceId) {
			this.showAnswer = true;
			return false;
		}
		return true;

	}

}
