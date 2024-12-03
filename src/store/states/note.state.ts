import { UUID } from '@constants/common.constant';
import { NoteContent, NoteQueryParams } from '@models/note.model';

export interface Note_ModuleState {

	ui: Note_UIState;

}

export interface Note_UIState {

	selectedId: UUID | null;
	content: NoteContent | null;
	queryParams: NoteQueryParams;

}

// INITIALIZATION

export const note_initialUIState: Note_UIState = {

	selectedId: null,
	content: null,
	queryParams: {
		search: null,
		tags: []
	}

};

export const note_initialState: Note_ModuleState = {

	ui: note_initialUIState

};
