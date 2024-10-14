import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Note_ModuleState } from '@states';

const selNote_ModuleState = createFeatureSelector<Note_ModuleState>('note');

export const selNote_UIState = createSelector(

	selNote_ModuleState,
	state => state.ui

);
