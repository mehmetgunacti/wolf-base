import { Action, createReducer, on } from '@ngrx/store';
import { closeEditBookmarkDialog, openAddBookmarkDialog, openEditBookmarkDialog, toggleSearchAndTagCloudVisibility } from 'store/actions/bookmark-ui.actions';
import { createBookmarkSuccess, deleteBookmarkSuccess, updateBookmarkSuccess } from 'store/actions/bookmark.actions';
import { BookmarkUIState, initialBookmarkUIState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkUIState,
	on(toggleSearchAndTagCloudVisibility, state => ({ ...state, tagCloudVisible: !state.tagCloudVisible })),
	on(openAddBookmarkDialog, (state): BookmarkUIState => ({ ...state, editDialogVisible: true })),
	on(openEditBookmarkDialog, (state, { id }): BookmarkUIState => ({ ...state, editDialogVisible: true })),
	on(closeEditBookmarkDialog, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	on(createBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	on(updateBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	on(deleteBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false }))

);

export function bookmarkUIReducer(state: BookmarkUIState | undefined, action: Action): BookmarkUIState {
	return reducer(state, action);
}
