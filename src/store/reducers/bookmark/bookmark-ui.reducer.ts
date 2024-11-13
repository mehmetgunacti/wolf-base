import { bookmarkActions } from '@actions';
import { Action, createReducer, on } from '@ngrx/store';
import { BookmarkUIState, bookmark_initialUIState } from '@states';

const reducer = createReducer(

	bookmark_initialUIState,
	on(bookmarkActions.fromClipboardFailure, (state, { shaking }): BookmarkUIState => ({ ...state, shaking })),
	on(bookmarkActions.openFormDialog, (state): BookmarkUIState => ({ ...state, formVisible: true })),
	on(bookmarkActions.closeFormDialog, (state): BookmarkUIState => ({ ...state, formVisible: false })),
	on(bookmarkActions.openEditDialog, (state, { id }): BookmarkUIState => ({ ...state, editId: id, formVisible: true })),
	on(bookmarkActions.setQueryParams, (state, { id, search, tags }): BookmarkUIState => ({ ...state, queryParams: { id, search, tags } })),
	on(bookmarkActions.editSuccess, (state): BookmarkUIState => ({ ...state, editId: null, formVisible: false })),

);

export function bookmarkUIReducer(state: BookmarkUIState | undefined, action: Action): BookmarkUIState {
	return reducer(state, action);
}
