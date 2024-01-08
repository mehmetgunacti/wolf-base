import { Action, createReducer, on } from '@ngrx/store';
import * as bmActions from 'store/actions/bookmark.actions';
import { fromClipboardFailure } from 'store/actions/bookmark.actions';
import { BookmarkUIState, initialBookmarkUIState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkUIState,
	on(fromClipboardFailure, (state, { shaking }): BookmarkUIState => ({ ...state, shaking })),
	on(bmActions.openAddBookmarkDialog, (state): BookmarkUIState => ({ ...state, editId: null })),
	on(bmActions.openEditBookmarkDialog, (state, { id }): BookmarkUIState => ({ ...state, editId: id })),
	on(bmActions.closeEditBookmarkDialog, (state): BookmarkUIState => ({ ...state, editId: null })),
	on(bmActions.setQueryParams, (state, { id, search, tags }): BookmarkUIState => ({ ...state, queryParams: { id, search, tags } }))

);

export function bookmarkUIReducer(state: BookmarkUIState | undefined, action: Action): BookmarkUIState {
	return reducer(state, action);
}
