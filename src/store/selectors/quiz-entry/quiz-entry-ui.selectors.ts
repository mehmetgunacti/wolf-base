import { QuizVisibility } from '@constants/quiz.constant';
import { createSelector } from '@ngrx/store';
import { selQuizEntry_UIState } from './quiz-entry.selectors';

export const selQuiz_visibility = createSelector(

	selQuizEntry_UIState,
	(state): QuizVisibility => state.visibility

);
