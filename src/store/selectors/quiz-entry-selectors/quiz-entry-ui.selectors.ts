import { createSelector } from '@ngrx/store';
import { selQuizEntry_UIState } from './quiz-entry.selectors';

export const selQuiz_choicesVisible = createSelector(

	selQuizEntry_UIState,
	state => state.choicesVisible

);
