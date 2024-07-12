import { Definition, insertAtRandomPosition, NUMBER_OF_CHOICES, Quiz, QuizProgress, UUID, Word } from '@lib';
import { createSelector } from '@ngrx/store';
import { produce } from "immer";
import { selQuizEntry_array } from '../quiz-entry-selectors/quiz-entry-entities.selectors';
import { selWord_array } from '../word-selectors/word-entities.selectors';
import { selQuizEntry_UIState } from './quiz-entry.selectors';

export const selQuiz_answer = createSelector(

	selQuizEntry_UIState,
	state => state.answer

);

/**
 * Whenever the user answers a question, right or wrong, 'now' gets updated in database
 * and this selector emits a new value => all other selectors are triggered => new Quiz
 */
// const selQuiz_now = createSelector(

// 	selQuizEntry_UIState,
// 	state => state.now

// );

// const selQuiz_nextProgress = createSelector(

// 	selQuiz_now,
// 	selQuizEntry_array,
// 	(now: number, arr: QuizProgress[]): QuizProgress | null => arr.filter(q => q.next < now).at(0) ?? null

// );

/**
 * creates a Definition ID - Word Record,
 * where Words' definitions[] array contains only the one Definition,
 * which ID is also the resulting Record's ID
 */
// export const selQuiz_definitionIdWordMap = createSelector(

// 	selWord_array,
// 	(words: Word[]): Record<UUID, Word> => {

// 		const map: Record<UUID, Word> = {};
// 		words.forEach(w => {

// 			w.definitions.forEach(d => {

// 				// need a copy of Word, because 'definitions' array is being modified
// 				map[d.id] = produce(w, (draft) => { draft.definitions = [d]; });

// 			});

// 		});
// 		return map;

// 	}

// );

// export const selQuiz_next = createSelector(

// 	selQuiz_definitionIdWordMap,
// 	selQuiz_nextProgress,
// 	(map, progress): Quiz | null => {

// 		if (!progress)
// 			return null;

// 		const question = map[progress.id];
// 		if (!question)
// 			throw Error('progress.id not found in map');

// 		const result: Word[] = [question]; // first entry is the question, rest are choices

// 		const potentialChoices: Word[] = Object.values(map).filter(w => w.definitions[0].type === question.definitions[0].type);
// 		for (let i = 0; i < NUMBER_OF_CHOICES; ++i) { // choose NUMBER_OF_CHOICES random definitions

// 			const randomIdx = Math.floor(potentialChoices.length * Math.random());
// 			result.push(potentialChoices[randomIdx]);

// 		}
// 		console.log('creating new Quiz()..');
// 		return new Quiz(result);

// 	}

// );

// export const selQuiz_next1 = createSelector(

// 	selQuiz_definitionIdWordMap,
// 	selQuiz_nextProgress,
// 	selWord_array,
// 	(map, progress, words): Quiz | null => {

// 		if (!progress)
// 			return null;

// 		const word = map[progress.id];
// 		if (!word)
// 			return null;

// 		// ask Word.name or Word.definitions[0].name ?
// 		const askWord = Math.random() < 0.5;

// 		if (askWord) {

// 			const potentialChoices: Definition[] =
// 				words
// 					.filter(w => w.id !== word.id) // remove question
// 					.flatMap(w => w.definitions)
// 					.filter(d => d.type === word.definitions[0].type);  // filter definitions of same type

// 			const choices: Definition[] = [];
// 			for (let i = 0; i < NUMBER_OF_CHOICES; ++i) { // choose 5 random definitions

// 				const randomIdx = Math.floor(potentialChoices.length * Math.random());
// 				choices.push(potentialChoices[randomIdx]);

// 			}
// 			insertAtRandomPosition(choices, word.definitions[0]); // add actual answer
// 			return new Quiz(
// 				word.definitions[0].id,
// 				word.name,
// 				word.definitions[0].id,
// 				choices.map(d => d.name),
// 				choices.map(d => d.id)
// 			);

// 		} else {

// 			const potentialChoices: Word[] =
// 				Object.values(map)
// 					.filter(w => w.id !== word.id) // remove question
// 					.filter(w => compareDefinitonType(w, word)); // filter words of same type

// 			const choices: Word[] = [];
// 			for (let i = 0; i < NUMBER_OF_CHOICES; ++i) { // choose 5 random words

// 				const randomIdx = Math.floor(potentialChoices.length * Math.random());
// 				choices.push(potentialChoices[randomIdx]);

// 			}
// 			insertAtRandomPosition(choices, word); // add actual answer as `NUMBER_OF_CHOICES + 1` choice
// 			return new Quiz(
// 				word.definitions[0].id,
// 				word.definitions[0].name,
// 				word.definitions[0].id,
// 				choices.map(w => w.name),
// 				choices.map(w => w.definitions[0].id)
// 			);

// 		}

// 	}

// );
