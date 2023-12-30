import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteContent_ModuleState } from 'store/states/note-content.state';

const selNoteContent_ModuleState = createFeatureSelector<NoteContent_ModuleState>('noteContent');

export const selNoteContent_EntitiesState = createSelector(

	selNoteContent_ModuleState,
	state => state.entities

);
