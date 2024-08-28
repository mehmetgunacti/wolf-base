import { NoteContent } from '@lib';

export interface NoteContent_ModuleState {

	ui: NoteContent_UIState;

}

export interface NoteContent_UIState {

	content: NoteContent | null;

}

// INITIALIZATION

export const noteContent_initialUIState: NoteContent_UIState = {

	content: null

};

export const noteContent_initialState: NoteContent_ModuleState = {

	ui: noteContent_initialUIState

};
