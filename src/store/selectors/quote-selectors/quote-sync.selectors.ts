import { RemoteMetadata, SyncData, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selQuote_EntitiesState } from './quote.selectors';

export const selQuoteSyncDataArray = createSelector(

	selQuote_EntitiesState,
	(state): SyncData[] => Object.values(state.syncData)

);

export const selQuoteSyncDataMap = createSelector(

	selQuoteSyncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

export const selQuoteRemoteMetadataArray = createSelector(

	selQuote_EntitiesState,
	(state): RemoteMetadata[] => Object.values(state.remoteMetadata)

);

export const selQuoteRemoteMetadataMap = createSelector(

	selQuoteRemoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);
