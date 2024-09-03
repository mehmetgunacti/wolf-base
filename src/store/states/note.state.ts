import { NoteContent, NoteQueryParams, UUID } from '@lib';

export interface Note_ModuleState {

	ui: Note_UIState;

}

export interface Note_UIState {

	selectedId: UUID | null;
	content: NoteContent | null;
	queryParams: NoteQueryParams;

}

// INITIALIZATION

export const initialNoteUIState: Note_UIState = {

	selectedId: null,
	content: null,
	queryParams: {
		search: null,
		tags: []
	}

};

export const initialNoteState: Note_ModuleState = {

	ui: initialNoteUIState

};
