import { QuizProgress, UUID, Word } from '@lib';
import { createSelector } from '@ngrx/store';
import { produce } from 'immer';
import { selCore_now } from '../core-ui.selectors';
import { selQuizEntry_UIState } from './quiz-entry.selectors';
import { selWord_EntityList } from '../entity-selectors/entity-word.selectors';
import { selQuizEntry_EntityList } from '../entity-selectors/entity-quiz-entry.selectors';

export const selQuiz_answer = createSelector(

	selQuizEntry_UIState,
	state => state.answer

);

function toMap(words: Word[]): Record<UUID, Word> {

	const map: Record<UUID, Word> = {};
	words.forEach(w => {

		w.definitions.forEach(d => {

			// need a copy of Word, because 'definitions' array is being modified
			map[d.id] = produce(w, (draft) => { draft.definitions = [d]; });

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
	(allProgress, now): QuizProgress[] => {

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

export const selQuiz_quizProgress = createSelector(

	selQuiz_dueItems,
	(dueItems: QuizProgress[]): QuizProgress | null => dueItems[0] ?? null

);
