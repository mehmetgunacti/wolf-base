import { Action, createReducer, on } from '@ngrx/store';
import { closeEditBookmarkDialogSuccess, openAddBookmarkDialogSuccess, openEditBookmarkDialogSuccess } from 'store/actions/bookmark-ui.actions';
import { BookmarkUIState, initialBookmarkUIState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkUIState,
	on(openAddBookmarkDialogSuccess, (state, { id }): BookmarkUIState => ({ ...state, editDialogOverlayId: id })),
	on(openEditBookmarkDialogSuccess, (state, { id }): BookmarkUIState => ({ ...state, editDialogOverlayId: id })),
	on(closeEditBookmarkDialogSuccess, (state): BookmarkUIState => ({ ...state, editDialogOverlayId: null })),
	// on(createBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	// on(updateBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	// on(deleteBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false }))

);

export function bookmarkUIReducer(state: BookmarkUIState | undefined, action: Action): BookmarkUIState {
	return reducer(state, action);
}
