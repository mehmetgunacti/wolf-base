import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromStates from '../states';

const reducer = createReducer(

	fromStates.uiInitialState,
	on(fromActions.toggleSearchAndTagCloudVisibility, state => ({ ...state, tagCloudVisible: !state.tagCloudVisible })),
	on(fromActions.openAddBookmarkDialog, (state): fromStates.UIState => ({ ...state, editDialogVisible: true })),
	on(fromActions.openEditBookmarkDialog, (state, { id }): fromStates.UIState => ({ ...state, editDialogVisible: true })),
	on(fromActions.closeEditBookmarkDialog, (state): fromStates.UIState => ({ ...state, editDialogVisible: false })),
	on(fromActions.createBookmarkSuccess, (state): fromStates.UIState => ({ ...state, editDialogVisible: false })),
	on(fromActions.updateBookmarkSuccess, (state): fromStates.UIState => ({ ...state, editDialogVisible: false }))

);

export function uiReducer(state: fromStates.UIState | undefined, action: Action): fromStates.UIState {
	return reducer(state, action);
}
