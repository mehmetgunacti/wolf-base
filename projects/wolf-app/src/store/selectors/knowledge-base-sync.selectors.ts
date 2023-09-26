import { createSelector } from '@ngrx/store';
import { RemoteMetadata, SyncData, UUID } from '@lib';
import { selKnowledgeBaseSyncState } from './knowledge-base.selectors';

export const selKnowledgeBaseSyncDataArray = createSelector(

	selKnowledgeBaseSyncState,
	state => state.syncData

);

export const selKnowledgeBaseSyncDataMap = createSelector(

	selKnowledgeBaseSyncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

export const selKnowledgeBaseRemoteMetadataArray = createSelector(

	selKnowledgeBaseSyncState,
	state => state.remoteMetadata

);

export const selKnowledgeBaseRemoteMetadataMap = createSelector(

	selKnowledgeBaseRemoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);
