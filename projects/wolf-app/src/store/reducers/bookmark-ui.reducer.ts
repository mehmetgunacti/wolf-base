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
	// on(createBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	// on(updateBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	// on(deleteBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false }))

);

export function bookmarkUIReducer(state: BookmarkUIState | undefined, action: Action): BookmarkUIState {
	return reducer(state, action);
}
