import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuizEntry_ModuleState } from 'store/states/quiz-entry.state';
import { selEntity_ModuleState } from '../entity-selectors/entity.selectors';

const selQuizEntry_ModuleState = createFeatureSelector<QuizEntry_ModuleState>('quizEntry');

export const selQuizEntry_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.quizEntry

);

export const selQuizEntry_UIState = createSelector(

	selQuizEntry_ModuleState,
	state => state.ui

);
