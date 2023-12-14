import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteModuleState } from 'store/states/note.state';

const selNoteModuleState = createFeatureSelector<NoteModuleState>('note');

export const selNoteEntitiesState = createSelector(

	selNoteModuleState,
	state => state.entities

);

export const selNoteUIState = createSelector(

	selNoteModuleState,
	state => state.ui

);

export const selNoteTagsState = createSelector(

	selNoteModuleState,
	state => state.tags

);
