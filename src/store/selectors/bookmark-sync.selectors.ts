import { createSelector } from '@ngrx/store';
import { selBookmarkSyncState } from './bookmark.selectors';

export const selBookmarkSyncDataArray = createSelector(

	selBookmarkSyncState,
	state => state.syncData

);

export const selBookmarkRemoteMetadataArray = createSelector(

	selBookmarkSyncState,
	state => state.remoteMetadata

);