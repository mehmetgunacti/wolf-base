import { NoteContent, NoteQueryParams } from '@lib';

export interface Note_ModuleState {

	ui: Note_UIState;

}

export interface Note_UIState {

	content: NoteContent | null;
	queryParams: NoteQueryParams;

}

// INITIALIZATION

export const initialNoteUIState: Note_UIState = {

	content: null,
	queryParams: {
		search: null,
		tags: []
	}

};

export const initialNoteState: Note_ModuleState = {

	ui: initialNoteUIState

};
