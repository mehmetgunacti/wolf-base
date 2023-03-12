import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromStates from '../states';
import { SYNC_STATES } from 'lib';
import { BookmarksState } from '../states';

const reducer = createReducer(

	fromStates.bookmarksInitialState,

	on(fromActions.bookmarksLoadAll, (state): BookmarksState => fromStates.bookmarksAdapter.setAll([], { ...state })),
	on(fromActions.bookmarksSearch, (state): BookmarksState => fromStates.bookmarksAdapter.setAll([], { ...state })),
	on(fromActions.tagsToggleSelected, (state): BookmarksState => fromStates.bookmarksAdapter.setAll([], { ...state })),

	on(fromActions.bookmarksLoadAllSuccess, (state, { bookmarks }): BookmarksState =>
		fromStates.bookmarksAdapter.setAll(bookmarks, { ...state, bookmarksSearchTerm: '' })
	),

	on(fromActions.bookmarksSearchSuccess, (state, { bookmarks }): BookmarksState =>
		fromStates.bookmarksAdapter.setAll(bookmarks, { ...state })
	),

	on(fromActions.bookmarksSyncRequired, (state, { syncRequired }): BookmarksState => ({ ...state, syncRequired })),
	on(fromActions.bookmarksSyncReady, (state): BookmarksState => ({

		...state,
		syncStatus: SYNC_STATES.READY,
		syncMessages: [],
		syncForceOverride: false

	})),
	on(fromActions.bookmarksSyncToggleForceOverride, (state): BookmarksState => ({ ...state, syncForceOverride: !state.syncForceOverride })),
	on(fromActions.bookmarksSyncSetState, (state, { syncState }): BookmarksState => {

		const status = syncState.status ? syncState.status : state.syncStatus;
		const messages = syncState.message ? [...state.syncMessages, syncState.message] : state.syncMessages;
		return { ...state, syncStatus: status, syncMessages: messages };

	}),
	on(fromActions.bookmarksAddOpenDialog, (state): BookmarksState => ({ ...state, editDialogVisible: true, selected: null })),
	on(fromActions.bookmarksEditOpenDialog, (state, {id}): BookmarksState => ({ ...state, editDialogVisible: true, selected: id })),
	on(fromActions.bookmarksEditCloseDialog, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null }))

);

export function bookmarksReducer(state: fromStates.BookmarksState | undefined, action: Action): fromStates.BookmarksState {
	return reducer(state, action);
}
