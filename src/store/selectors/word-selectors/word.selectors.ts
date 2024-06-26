import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Word_ModuleState } from 'store/states/word.state';

const selWord_ModuleState = createFeatureSelector<Word_ModuleState>('word');

export const selWord_EntitiesState = createSelector(

	selWord_ModuleState,
	state => state.entities

);

export const selWord_UIState = createSelector(

	selWord_ModuleState,
	state => state.ui

);
