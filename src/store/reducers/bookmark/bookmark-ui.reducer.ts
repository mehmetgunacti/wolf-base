import { bookmarkActions } from '@actions/bookmark.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { bookmark_initialUIState, Bookmark_UIState } from '@states/bookmark.state';

const reducer = createReducer(

	bookmark_initialUIState,
	on(bookmarkActions.fromClipboardFailure, (state, { shaking }): Bookmark_UIState => ({ ...state, shaking })),
	on(bookmarkActions.openFormDialog, (state): Bookmark_UIState => ({ ...state, editId: null, formVisible: true })),
	on(bookmarkActions.closeFormDialog, (state): Bookmark_UIState => ({ ...state, editId: null, formVisible: false })),
	on(bookmarkActions.openEditDialog, (state, { id }): Bookmark_UIState => ({ ...state, editId: id, formVisible: true })),
	on(bookmarkActions.setQueryParams, (state, { id, search, tags }): Bookmark_UIState => ({ ...state, queryParams: { id, search, tags } })),
	on(bookmarkActions.editSuccess, (state): Bookmark_UIState => ({ ...state, editId: null, formVisible: false })),

);

export function bookmarkUIReducer(state: Bookmark_UIState | undefined, action: Action): Bookmark_UIState {
	return reducer(state, action);
}
