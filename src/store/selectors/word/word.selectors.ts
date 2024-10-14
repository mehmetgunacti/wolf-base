import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Word_ModuleState } from '@states';

const selWord_ModuleState = createFeatureSelector<Word_ModuleState>('word');

export const selWord_UIState = createSelector(

	selWord_ModuleState,
	state => state.ui

);
