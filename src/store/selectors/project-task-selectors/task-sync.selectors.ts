import { RemoteMetadata, SyncData, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selTask_EntitiesState } from './task.selectors';

export const selTaskSyncDataArray = createSelector(

	selTask_EntitiesState,
	(state): SyncData[] => Object.values(state.syncData)

);

export const selTaskSyncDataMap = createSelector(

	selTaskSyncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

export const selTaskRemoteMetadataArray = createSelector(

	selTask_EntitiesState,
	(state): RemoteMetadata[] => Object.values(state.remoteMetadata)

);

export const selTaskRemoteMetadataMap = createSelector(

	selTaskRemoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);
