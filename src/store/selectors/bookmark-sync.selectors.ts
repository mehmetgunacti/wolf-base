import { createSelector } from '@ngrx/store';
import { selectorBookmarkSyncState } from './bookmark.selectors';

export const selectorBookmarkSyncDataArray = createSelector(

	selectorBookmarkSyncState,
	state => state.syncData

);

export const selectorBookmarkRemoteMetadataArray = createSelector(

	selectorBookmarkSyncState,
	state => state.remoteMetadata

);