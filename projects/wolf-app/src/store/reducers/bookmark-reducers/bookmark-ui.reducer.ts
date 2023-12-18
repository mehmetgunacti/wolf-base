import { Action, createReducer, on } from '@ngrx/store';
import * as bmActions from 'store/actions/bookmark.actions';
import { fromClipboardFailure } from 'store/actions/bookmark.actions';
import { BookmarkUIState, initialBookmarkUIState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkUIState,
	on(bmActions.openAddBookmarkDialogSuccess, (state, { id }): BookmarkUIState => ({ ...state, editDialogOverlayId: id })),
	on(bmActions.openEditBookmarkDialogSuccess, (state, { id }): BookmarkUIState => ({ ...state, editDialogOverlayId: id })),
	on(bmActions.closeEditBookmarkDialogSuccess, (state): BookmarkUIState => ({ ...state, editDialogOverlayId: null })),
	on(fromClipboardFailure, (state, { shaking }): BookmarkUIState => ({ ...state, shaking })),
	on(bmActions.openAddBookmarkDialog, (state): BookmarkUIState => ({ ...state, editId: null })),
	on(bmActions.openEditBookmarkDialog, (state, { id }): BookmarkUIState => ({ ...state, editId: id })),
	on(bmActions.closeEditBookmarkDialog, (state): BookmarkUIState => ({ ...state, editId: null })),
	on(bmActions.setQueryParams, (state, { id, search, tags }): BookmarkUIState => ({ ...state, queryParams: { id, search, tags } }))
	// on(bmActions.setSelectedId, (state, { id }): BookmarkUIState => ({ ...state, selectedId: id })),
	// on(bmActions.search, (state, { term }): BookmarkUIState => ({ ...state, searchTerm: term })),
	// on(bmActions.setSelectedTags, (state, { tags }): BookmarkUIState => ({ ...state, selectedTags: tags })),

);

export function bookmarkUIReducer(state: BookmarkUIState | undefined, action: Action): BookmarkUIState {
	return reducer(state, action);
}
