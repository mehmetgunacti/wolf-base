import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Note_ModuleState } from 'store/states/note.state';

const selNoteModuleState = createFeatureSelector<Note_ModuleState>('note');

export const selNoteEntitiesState = createSelector(

	selNoteModuleState,
	state => state.entities

);

export const selNoteUIState = createSelector(

	selNoteModuleState,
	state => state.ui

);
