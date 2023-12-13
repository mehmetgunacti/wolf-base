import { Bookmark, Click, RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as bmActions from 'store/actions/bookmark.actions';
import { BookmarkEntitiesState, initialBookmarkEntitiesState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkEntitiesState,
	on(bmActions.loadOneSuccess, (state, { id, bookmark, syncData, remoteMetadata, click }): BookmarkEntitiesState => {

		return produce(
			state,
			draft => {

				// bookmark
				if (bookmark === null)
					delete draft.entities[id];
				else
					draft.entities[id] = bookmark;

				// syncData
				if (syncData === null)
					delete draft.syncData[id];
				else
					draft.syncData[id] = syncData;

				// remoteMetadata
				if (remoteMetadata === null)
					delete draft.remoteMetadata[id];
				else
					draft.remoteMetadata[id] = remoteMetadata;

				// click
				if (click === null)
					delete draft.clicks[id];
				else
					draft.clicks[id] = click;

			}
		);

	}),
	on(bmActions.unloadOne, (state, { id }): BookmarkEntitiesState => {

		return produce(
			state,
			draft => {

				delete draft.entities[id];
				delete draft.syncData[id];
				delete draft.remoteMetadata[id];
				delete draft.clicks[id];

			}
		);

	}),
	on(
		bmActions.loadAllSuccess, (state, { bookmarks, syncData, remoteMetadata, clicks }): BookmarkEntitiesState => ({

			...state,
			entities: bookmarks.reduce((record, bookmark) => { record[bookmark.id] = bookmark; return record; }, {} as Record<UUID, Bookmark>),
			syncData: syncData.reduce((record, syncData) => { record[syncData.id] = syncData; return record; }, {} as Record<UUID, SyncData>),
			remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>),
			clicks: clicks.reduce((record, click) => { record[click.id] = click; return record; }, {} as Record<UUID, Click>)

		})
	),
	on(
		bmActions.loadAllClicksSuccess, (state, { clicks }): BookmarkEntitiesState => {

			return produce(
				state,
				draft => {

					draft.clicks = clicks.reduce((record, click) => { record[click.id] = click; return record; }, {} as Record<UUID, Click>)

				}
			);

		}
	),
	on(
		bmActions.loadOneClickSuccess, (state, { id, click }): BookmarkEntitiesState => {

			return produce(
				state,
				draft => {

					if (click === null)
						delete draft.clicks[id];
					else
						draft.clicks[id] = click;

				}
			);

		}
	),
	on(bmActions.moveToTrashSuccess, (state, { id }): BookmarkEntitiesState => {

		return produce(
			state,
			draft => { delete draft.entities[id]; }
		);

	}),
	// on(bmActions.syncRemoteDeletedSuccess, (state, { item }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => {
	// 			delete draft.entities[item.id];
	// 		}
	// 	);

	// }),
	on(bmActions.openAddBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(bmActions.openEditBookmarkDialog, (state, { id }): BookmarkEntitiesState => ({ ...state, selected: id })),
	on(bmActions.closeEditBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	// on(bmActions.loadAllSyncDataSuccess, (state, { syncData }): BookmarkEntitiesState => ({

	// 	...state,
	// 	syncData: syncData.reduce((record, sd) => { record[sd.id] = sd; return record; }, {} as Record<UUID, SyncData>)

	// })),
	on(bmActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): BookmarkEntitiesState => ({

		...state,
		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	})),
	// on(bmActions.loadTrashCountSuccess, (state, { count }): BookmarkEntitiesState => ({ ...state, trashCount: count })),
	// on(bmActions.loadOneSyncDataSuccess, (state, { syncData }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => { draft.syncData[syncData.id] = syncData; }
	// 	);

	// }),
	// on(bmActions.loadOneSyncDataFailure, (state, { id }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => { delete draft.syncData[id]; }
	// 	);

	// }),
	// on(bmActions.loadOneRemoteMetadataSuccess, (state, { remoteMetadata }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => { draft.remoteMetadata[remoteMetadata.id] = remoteMetadata }
	// 	);

	// }),
	// on(bmActions.loadOneRemoteMetadataFailure, (state, { id }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => { delete draft.remoteMetadata[id] }
	// 	);

	// }),
	// on(bmActions.syncLocalNewSuccess, (state, { id, syncData, remoteMetadata }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => {

	// 			if (syncData === null)
	// 				delete draft.syncData[id];
	// 			else
	// 				draft.syncData[id] = syncData;

	// 			if (remoteMetadata === null)
	// 				delete draft.remoteMetadata[id];
	// 			else
	// 				draft.remoteMetadata[id] = remoteMetadata;

	// 		}
	// 	);

	// }),
	// on(bmActions.syncLocalUpdatedSuccess, (state, { id, syncData, remoteMetadata }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => {

	// 			if (syncData === null)
	// 				delete draft.syncData[id];
	// 			else
	// 				draft.syncData[id] = syncData;

	// 			if (remoteMetadata === null)
	// 				delete draft.remoteMetadata[id];
	// 			else
	// 				draft.remoteMetadata[id] = remoteMetadata;

	// 		}
	// 	);

	// }),
	// on(bmActions.uploadSuccess, (state, { remoteMetadata }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => {
	// 			draft.syncData[remoteMetadata.id] = { ...remoteMetadata, updated: false, deleted: false, error: null };
	// 			draft.remoteMetadata[remoteMetadata.id] = remoteMetadata;
	// 		}
	// 	);

	// }),
	// on(bmActions.syncLocalDeletedSuccess, (state, { item }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => {
	// 			delete draft.syncData[item.id];
	// 			delete draft.remoteMetadata[item.id];
	// 		}
	// 	);

	// }),
	// on(bmActions.syncRemoteDeletedSuccess, (state, { item }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => {
	// 			delete draft.syncData[item.id];
	// 			delete draft.remoteMetadata[item.id];
	// 		}
	// 	);

	// }),
	// on(bmActions.syncDeletedDeletedSuccess, (state, { item }): BookmarkEntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => {
	// 			delete draft.syncData[item.id];
	// 		}
	// 	);

	// })


);

export function bookmarkEntitiesReducer(state: BookmarkEntitiesState | undefined, action: Action): BookmarkEntitiesState {
	return reducer(state, action);
}
