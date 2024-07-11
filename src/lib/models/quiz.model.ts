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
	title: string;

	constructor(public words: Word[]) {

		// What to ask; word or definition?
		const askWord = Math.random() < 0.5;

		const word = words[0];
		const definition = word.definitions[0];
		const isVerb = definition.type === DefinitionType.verb;

		// prepare question
		this.question = {

			id: definition.id,
			name: `(${definition.type}) ` + (askWord ? (isVerb ? 'to ' : ' ') + word.name : definition.name)

		};

		// set title
		this.title = definition.samples.join('\n\n').replaceAll(word.name, '***');

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

		return this.question.id === choiceId;

	}

}
