import { Action, createReducer, on } from '@ngrx/store';
import { BookmarkActions } from 'store/actions';
import * as fromStates from '../states';

const reducer = createReducer(

	fromStates.uiInitialState,
	on(BookmarkActions.UI.toggleSearchAndTagCloudVisibility, state => ({ ...state, tagCloudVisible: !state.tagCloudVisible })),
	on(BookmarkActions.UI.openAddBookmarkDialog, (state): fromStates.UIState => ({ ...state, editDialogVisible: true })),
	on(BookmarkActions.UI.openEditBookmarkDialog, (state, { id }): fromStates.UIState => ({ ...state, editDialogVisible: true })),
	on(BookmarkActions.UI.closeEditBookmarkDialog, (state): fromStates.UIState => ({ ...state, editDialogVisible: false })),
	on(BookmarkActions.createBookmarkSuccess, (state): fromStates.UIState => ({ ...state, editDialogVisible: false })),
	on(BookmarkActions.updateBookmarkSuccess, (state): fromStates.UIState => ({ ...state, editDialogVisible: false }))

);

export function uiReducer(state: fromStates.UIState | undefined, action: Action): fromStates.UIState {
	return reducer(state, action);
}
