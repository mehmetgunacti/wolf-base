import { NameBase } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNote_entities } from '../note-selectors/note-entities.selectors';
import { selNoteContent_EntitiesState, selNoteContent_UIState } from './note-content.selectors';

export const selNoteContent_ids = createSelector(

	selNoteContent_EntitiesState,
	state => Object.keys(state.entities)

);

export const selNoteContent_array = createSelector(

	selNoteContent_ids,
	selNote_entities,
	(ids, notes): NameBase[] => ids.map(id => ({ id, name: notes[id]?.name ?? 'NOTE_ID_NOT_FOUND' }))

);

export const selNoteContent_count = createSelector(

	selNoteContent_ids,
	ids => ids.length

);

export const selNoteContent_content = createSelector(

	selNoteContent_UIState,
	state => state.content

);
