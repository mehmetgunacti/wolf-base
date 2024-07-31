import { createSelector } from '@ngrx/store';
import { selQuizEntry_UIState } from './quiz-entry.selectors';
import { QuizVisibility } from '@lib';

export const selQuiz_visibility = createSelector(

	selQuizEntry_UIState,
	(state): QuizVisibility => state.visibility

);
