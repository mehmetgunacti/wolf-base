import { Action, createReducer, on } from '@ngrx/store';
import * as bmActions from 'store/actions/bookmark.actions';
import { produce } from 'immer';
import { BookmarkSyncState, initialBookmarkSyncState } from 'store/states/bookmark.state';
import { RemoteMetadata, SyncData, UUID } from '@lib';

const reducer = createReducer(

	initialBookmarkSyncState,

	on(bmActions.loadAllSyncDataSuccess, (state, { syncData }): BookmarkSyncState => ({

		...state,
		syncData: syncData.reduce((record, sd) => { record[sd.id] = sd; return record; }, {} as Record<UUID, SyncData>)

	})),
	on(bmActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): BookmarkSyncState => ({

		...state,
		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	})),
	on(bmActions.loadTrashCountSuccess, (state, { count }): BookmarkSyncState => ({ ...state, trashCount: count })),
	on(bmActions.loadOneSyncDataSuccess, (state, { syncData }): BookmarkSyncState => {

		return produce(
			state,
			draft => { draft.syncData[syncData.id] = syncData }
		);

	}),
	on(bmActions.loadOneSyncDataFailure, (state, { id }): BookmarkSyncState => {

		return produce(
			state,
			draft => { delete draft.syncData[id] }
		);

	})

);

export function bookmarkSyncReducer(state: BookmarkSyncState | undefined, action: Action): BookmarkSyncState {
	return reducer(state, action);
}
