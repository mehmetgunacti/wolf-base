import { DefinitionType, Progress, UUID } from 'lib/constants';
import { Entity } from './entity.model';
import { NameBase } from './id-base.model';
import { Word } from './word.model';
import { maskOrHighlight } from 'lib/utils';

export interface QuizProgress extends Entity {

	next: number;
	level: Progress;

}

export class Quiz {

	question: NameBase;
	choices: NameBase[];
	contexts: string[];
	samples: string[];

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

		// set contexts
		this.contexts = [
			...word.contexts.map(s => maskOrHighlight(s, word.name, askWord))
		]

		// set samples
		this.samples = [
			...word.definitions.flatMap(
				d => d.samples.map(s => maskOrHighlight(s, word.name, askWord))
			)
		];

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
