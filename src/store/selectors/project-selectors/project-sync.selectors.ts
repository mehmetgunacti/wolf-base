import { RemoteMetadata, SyncData, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selProject_EntitiesState } from '../entity-selectors/entity.selectors';

export const selProjectSyncDataArray = createSelector(

	selProject_EntitiesState,
	(state): SyncData[] => Object.values(state.syncData)

);

export const selProjectSyncDataMap = createSelector(

	selProjectSyncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

export const selProjectRemoteMetadataArray = createSelector(

	selProject_EntitiesState,
	(state): RemoteMetadata[] => Object.values(state.remoteMetadata)

);

export const selProjectRemoteMetadataMap = createSelector(

	selProjectRemoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);
