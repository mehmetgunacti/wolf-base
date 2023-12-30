import { Action, createReducer } from '@ngrx/store';
import { Note_UIState, initialNoteUIState } from 'store/states/note.state';

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

export function note_UIReducer(state: Note_UIState | undefined, action: Action): Note_UIState {
	return reducer(state, action);
}
