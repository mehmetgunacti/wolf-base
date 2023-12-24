import { RemoteMetadata, SyncData, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNoteContent_EntitiesState } from './note-content.selectors';

export const selNoteContent_syncDataArray = createSelector(

	selNoteContent_EntitiesState,
	(state): SyncData[] => Object.values(state.syncData)

);

export const selNoteContent_syncDataMap = createSelector(

	selNoteContent_syncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

export const selNoteContent_remoteMetadataArray = createSelector(

	selNoteContent_EntitiesState,
	(state): RemoteMetadata[] => Object.values(state.remoteMetadata)

);

export const selNoteContent_remoteMetadataMap = createSelector(

	selNoteContent_remoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);
