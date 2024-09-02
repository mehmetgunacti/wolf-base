import { RemoteMetadata, SyncData, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selQuizEntry_EntitiesState } from '../entity-selectors/entity.selectors';

export const selQuizEntrySyncDataArray = createSelector(

	selQuizEntry_EntitiesState,
	(state): SyncData[] => Object.values(state.syncData)

);

export const selQuizEntrySyncDataMap = createSelector(

	selQuizEntrySyncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

export const selQuizEntryRemoteMetadataArray = createSelector(

	selQuizEntry_EntitiesState,
	(state): RemoteMetadata[] => Object.values(state.remoteMetadata)

);

export const selQuizEntryRemoteMetadataMap = createSelector(

	selQuizEntryRemoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);
