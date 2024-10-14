import { Action, createReducer, on } from '@ngrx/store';
import { bookmarkActions } from '@actions';
import { BookmarkUIState, bookmark_initialUIState } from '@states';

const reducer = createReducer(

	bookmark_initialUIState,
	on(bookmarkActions.fromClipboardFailure, (state, { shaking }): BookmarkUIState => ({ ...state, shaking })),
	on(bookmarkActions.openAddBookmarkDialog, (state): BookmarkUIState => ({ ...state, editId: null })),
	on(bookmarkActions.openEditBookmarkDialog, (state, { id }): BookmarkUIState => ({ ...state, editId: id })),
	on(bookmarkActions.closeEditBookmarkDialog, (state): BookmarkUIState => ({ ...state, editId: null })),
	on(bookmarkActions.setQueryParams, (state, { id, search, tags }): BookmarkUIState => ({ ...state, queryParams: { id, search, tags } }))

);

export function bookmarkUIReducer(state: BookmarkUIState | undefined, action: Action): BookmarkUIState {
	return reducer(state, action);
}
