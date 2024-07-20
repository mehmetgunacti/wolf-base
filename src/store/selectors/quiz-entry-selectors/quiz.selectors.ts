import { QuizProgress, UUID, Word } from '@lib';
import { createSelector } from '@ngrx/store';
import { selCore_now } from '../core-ui.selectors';
import { selQuizEntry_array } from '../quiz-entry-selectors/quiz-entry-entities.selectors';
import { selQuizEntry_UIState } from './quiz-entry.selectors';
import { produce } from 'immer';
import { selWord_array } from '../word-selectors/word-entities.selectors';

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

	selWord_array,
	(words: Word[]): Record<UUID, Word> => toMap(words)

);

export const selQuiz_quizProgress = createSelector(

	selQuizEntry_array,
	selCore_now,
	(allProgress, now): QuizProgress | null => {

		// sort array by 'next', then 'name'
		allProgress.sort((a, b) => {

			if (a.next === b.next)
				return a.name.localeCompare(b.name);
			return a.next - b.next;

		});
		return allProgress.find(q => q.next < now) ?? null;

	}

);
