import { DefinitionType, Progress, UUID } from 'lib/constants';
import { Entity } from './entity.model';
import { NameBase } from './id-base.model';
import { Definition, definitionName, Word } from './word.model';
import { maskOrHighlight } from 'lib/utils';

export interface QuizProgress extends Entity {

	next: number;
	level: Progress;

}

export class Quiz {

	askWord: boolean;
	isVerb: boolean;

	word: Word;
	definition: Definition;
	// question: NameBase;
	pronunciation: string | null;
	choices: Word[];

	contexts: string[];
	samples: string[];

	constructor(public words: Word[]) {

		// What to ask; word or definition?
		const askWord = Math.random() < 0.5;
		this.askWord = askWord;

		const word = words[0];
		const definition = word.definitions[0];

		this.word = word;
		this.definition = definition;
		this.isVerb = definition.type === DefinitionType.verb;

		// prepare question
		// this.question = {

		// 	id: definition.id,
		// 	name: `(${definition.type}) ` + (askWord ? (isVerb ? 'to ' : ' ') + word.name : definitionName(definition))

		// };

		// set pronunciation
		this.pronunciation = word.pronunciation;

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
		// const tmpChoices: Word[] = [];
		// const tmpWords = [...words].sort(() => Math.random() - 0.5); // shuffle
		// tmpWords.forEach(w => tmpChoices.push({

		// 	id: w.definitions[0].id,
		// 	name: askWord ? definitionName(w.definitions[0]) : w.name

		// }));
		this.choices = [...words].sort(() => Math.random() - 0.5); // shuffle

	}

	onRightAnswer(choiceId: UUID): boolean {

		return this.definition.id === choiceId;

	}

}
