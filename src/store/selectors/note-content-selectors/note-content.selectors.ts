import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteContent_ModuleState } from 'store/states/note-content.state';
import { selEntity_ModuleState } from '../entity-selectors/entity.selectors';

const selNoteContent_ModuleState = createFeatureSelector<NoteContent_ModuleState>('noteContent');

export const selNoteContent_EntitiesState = createSelector(

	selEntity_ModuleState,
	state => state.noteContent

);

export const selNoteContent_UIState = createSelector(

	selNoteContent_ModuleState,
	state => state.ui

);
