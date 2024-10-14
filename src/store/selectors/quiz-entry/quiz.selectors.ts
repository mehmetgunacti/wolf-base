import { createSelector } from '@ngrx/store';
import { produce } from 'immer';
import { UUID } from '@constants';
import { QuizEntry, Word } from '@models';
import { selCore_now } from '../core/core-ui.selectors';
import { selQuizEntry_EntityList } from '../entity/entity-quiz-entry.selectors';
import { selWord_EntityList } from '../entity/entity-word.selectors';
import { selQuizEntry_UIState } from './quiz-entry.selectors';

export const selQuiz_answer = createSelector(

	selQuizEntry_UIState,
	state => state.answer

);

/**
 * Converts an array of `Word` objects into a map where each key is a `UUID` from the `definitions` array of each `Word`,
 * and the value is a copy of the `Word` object with only the corresponding `definition`.
 *
 * @param {Word[]} words - An array of `Word` objects to be converted into a map.
 * @returns {Record<UUID, Word>} - A map where each key is a `UUID` from the `definitions` array of each `Word`,
 * and the value is a copy of the `Word` object with only the corresponding `definition`.
 */
function toMap(words: Word[]): Record<UUID, Word> {

	const map: Record<UUID, Word> = {};
	words.forEach(w => {

		w.definitions.forEach(d => {

			// Create a copy of the current word with only the current definition
			// and add it to the map with the definition's id as the key
			map[ d.id ] = produce(w, (draft) => { draft.definitions = [ d ]; });

		});

	});
	return map;

}

export const selQuiz_definitionIdWordMap = createSelector(

	selWord_EntityList,
	(words: Word[]): Record<UUID, Word> => toMap(words)

);

const selQuiz_dueItems = createSelector(

	selQuizEntry_EntityList,
	selCore_now,
	(allProgress, now): QuizEntry[] => {

		// sort array by 'next', then 'name'
		return allProgress
			.sort((a, b) => {

				if (a.next === b.next)
					return a.name.localeCompare(b.name);
				return a.next - b.next;

			})
			.filter(q => q.next < now);
	}

);

export const selQuiz_dueItemsCount = createSelector(

	selQuiz_dueItems,
	items => items.length

);

/** returns first element of due quiz entries */
export const selQuiz_quizEntry = createSelector(

	selQuiz_dueItems,
	(dueItems: QuizEntry[]): QuizEntry | null => dueItems[ 0 ] ?? null

);
