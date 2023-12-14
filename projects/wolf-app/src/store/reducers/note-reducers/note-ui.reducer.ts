import { Action, createReducer } from '@ngrx/store';
import { NoteUIState, initialNoteUIState } from 'store/states/note.state';

const reducer = createReducer(

	initialNoteUIState,
	// on(noteActions.openAddNoteDialogSuccess, (state, { id }): NoteUIState => ({ ...state, editDialogOverlayId: id })),
	// on(noteActions.openEditNoteDialogSuccess, (state, { id }): NoteUIState => ({ ...state, editDialogOverlayId: id })),
	// on(noteActions.closeEditNoteDialogSuccess, (state): NoteUIState => ({ ...state, editDialogOverlayId: null })),
	// on(fromClipboardFailure, (state, { shaking }): NoteUIState => ({ ...state, shaking })),
	// on(createNoteSuccess, (state): NoteUIState => ({ ...state, editDialogVisible: false })),
	// on(updateNoteSuccess, (state): NoteUIState => ({ ...state, editDialogVisible: false })),
	// on(deleteNoteSuccess, (state): NoteUIState => ({ ...state, editDialogVisible: false }))

);

export function noteUIReducer(state: NoteUIState | undefined, action: Action): NoteUIState {
	return reducer(state, action);
}
