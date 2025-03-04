import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizEntry_ModuleState } from '@states/quiz-entry.state';

const selQuizEntry_ModuleState = createFeatureSelector<QuizEntry_ModuleState>('quizEntry');

export const selQuizEntry_UIState = createSelector(

	selQuizEntry_ModuleState,
	state => state.ui

);
