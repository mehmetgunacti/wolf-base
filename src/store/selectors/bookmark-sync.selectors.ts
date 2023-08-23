import { createSelector } from '@ngrx/store';
import { sltBookmarkSyncState } from './bookmark.selectors';

export const sltBookmarkSyncDataArray = createSelector(

	sltBookmarkSyncState,
	state => state.syncData

);

export const sltBookmarkRemoteMetadataArray = createSelector(

	sltBookmarkSyncState,
	state => state.remoteMetadata

);