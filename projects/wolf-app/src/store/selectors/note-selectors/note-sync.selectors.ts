import { RemoteMetadata, SyncData, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNoteEntitiesState } from './note.selectors';

export const selNoteSyncDataArray = createSelector(

	selNoteEntitiesState,
	(state): SyncData[] => Object.values(state.syncData)

);

export const selNoteSyncDataMap = createSelector(

	selNoteSyncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

export const selNoteRemoteMetadataArray = createSelector(

	selNoteEntitiesState,
	(state): RemoteMetadata[] => Object.values(state.remoteMetadata)

);

export const selNoteRemoteMetadataMap = createSelector(

	selNoteRemoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);
