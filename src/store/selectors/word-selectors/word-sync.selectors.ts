import { RemoteMetadata, SyncData, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selWord_EntitiesState } from './word.selectors';

export const selWordSyncDataArray = createSelector(

	selWord_EntitiesState,
	(state): SyncData[] => Object.values(state.syncData)

);

export const selWordSyncDataMap = createSelector(

	selWordSyncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

export const selWordRemoteMetadataArray = createSelector(

	selWord_EntitiesState,
	(state): RemoteMetadata[] => Object.values(state.remoteMetadata)

);

export const selWordRemoteMetadataMap = createSelector(

	selWordRemoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);
