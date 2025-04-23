import { createSelector } from '@ngrx/store';
import { selEntity_ModuleState } from '@selectors/entity/entity.selectors';
import { selNote_UIState } from '../note/note.selectors';

export const selNoteContent_selectedHasContent = createSelector(

	selEntity_ModuleState,
	selNote_UIState,
	(entitiyState, noteState) => noteState.selectedId ? !!entitiyState.noteContent.entities[noteState.selectedId] : false

);


export const selNoteContent_content = createSelector(

	selNote_UIState,
	state => state.content

);
