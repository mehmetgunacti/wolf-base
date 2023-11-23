import { RemoteMetadata, SyncData, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selBookmarkSyncState } from './bookmark.selectors';

export const selBookmarkSyncDataArray = createSelector(

	selBookmarkSyncState,
	state => Object.values(state.syncData)

);

export const selBookmarkSyncDataMap = createSelector(

	selBookmarkSyncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

export const selBookmarkRemoteMetadataArray = createSelector(

	selBookmarkSyncState,
	state => Object.values(state.remoteMetadata)

);

export const selBookmarkRemoteMetadataMap = createSelector(

	selBookmarkRemoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);
