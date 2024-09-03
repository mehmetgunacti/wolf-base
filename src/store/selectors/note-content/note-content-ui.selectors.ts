import { createSelector } from '@ngrx/store';
import { selNote_UIState } from '../note/note.selectors';

export const selNoteContent_content = createSelector(

	selNote_UIState,
	state => state.content

);
