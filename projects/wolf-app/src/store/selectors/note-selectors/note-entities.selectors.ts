import { Note } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNoteEntitiesState } from './note.selectors';

export const selNotes = createSelector(

	selNoteEntitiesState,
	entities => entities.entities

);

export const selNoteIds = createSelector(

	selNoteEntitiesState,
	state => Object.keys(state.entities)

);

export const selNoteArray = createSelector(

	selNoteEntitiesState,
	(state): Note[] => Object.values(state.entities)

);

export const selNotesCount = createSelector(

	selNoteIds,
	ids => ids.length

);

export const selNote = createSelector(

	selNoteEntitiesState,
	state => state.selected ? state.entities[state.selected] : null

);
