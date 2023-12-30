import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Note_ModuleState } from 'store/states/note.state';

const selNote_ModuleState = createFeatureSelector<Note_ModuleState>('note');

export const selNote_EntitiesState = createSelector(

	selNote_ModuleState,
	state => state.entities

);

export const selNote_UIState = createSelector(

	selNote_ModuleState,
	state => state.ui

);
