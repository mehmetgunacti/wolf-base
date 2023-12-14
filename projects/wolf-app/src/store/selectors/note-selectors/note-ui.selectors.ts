import { createSelector } from '@ngrx/store';
import { selNotesCount } from './note-entities.selectors';
import { filteredNoteCount } from './note-tags.selectors';
import { selNoteUIState } from './note.selectors';

export const selNoteMenuBadge = createSelector(

	selNotesCount,
	filteredNoteCount,
	(total, filtered): [number, number] => ([total, filtered])

);
