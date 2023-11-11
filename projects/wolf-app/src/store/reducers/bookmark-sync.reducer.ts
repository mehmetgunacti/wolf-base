import { Action, createReducer, on } from '@ngrx/store';
import * as bmActions from 'store/actions/bookmark.actions';
import { BookmarkSyncState, initialBookmarkSyncState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkSyncState,

	on(bmActions.loadAllSyncDataSuccess, (state, { syncData }): BookmarkSyncState => ({ ...state, syncData })),
	on(bmActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): BookmarkSyncState => ({ ...state, remoteMetadata })),
	on(bmActions.loadTrashCountSuccess, (state, { count }): BookmarkSyncState => ({ ...state, trashCount: count }))

);

export function bookmarkSyncReducer(state: BookmarkSyncState | undefined, action: Action): BookmarkSyncState {
	return reducer(state, action);
}
