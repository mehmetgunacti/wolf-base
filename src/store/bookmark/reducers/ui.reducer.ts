import { Action, createReducer, on } from '@ngrx/store';
import { BookmarkActions } from 'store/actions';
import { BookmarkUIState, initialBookmarkUIState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkUIState,
	on(BookmarkActions.UI.toggleSearchAndTagCloudVisibility, state => ({ ...state, tagCloudVisible: !state.tagCloudVisible })),
	on(BookmarkActions.UI.openAddBookmarkDialog, (state): BookmarkUIState => ({ ...state, editDialogVisible: true })),
	on(BookmarkActions.UI.openEditBookmarkDialog, (state, { id }): BookmarkUIState => ({ ...state, editDialogVisible: true })),
	on(BookmarkActions.UI.closeEditBookmarkDialog, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	on(BookmarkActions.createBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false })),
	on(BookmarkActions.updateBookmarkSuccess, (state): BookmarkUIState => ({ ...state, editDialogVisible: false }))

);

export function uiReducer(state: BookmarkUIState | undefined, action: Action): BookmarkUIState {
	return reducer(state, action);
}
