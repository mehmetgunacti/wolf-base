import { createAction, props } from '@ngrx/store';
import { RemoteMetadata, SyncData } from 'lib';

export const loadSyncDataSuccess = createAction('[Bookmark Sync] Load SyncData Success', props<{ syncData: SyncData[] }>());
export const loadRemoteMetadataSuccess = createAction('[Bookmark Sync] Load RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());
export const loadTrashCountSuccess = createAction('[Bookmark Sync] Load Trash Count Success', props<{ count: number }>());

export const downloadRemoteMetadata = createAction('[Bookmark Sync] Download RemoteMetadata');
export const downloadRemoteMetadataSuccess = createAction('[Bookmark Sync] Download RemoteMetadata Success');

export const uploadLocalNew = createAction('[Bookmark Sync] Upload Local New');
export const uploadLocalNewSuccess = createAction('[Bookmark Sync] Upload Local New Success', props<{ count: number }>());

export const uploadLocalClicked = createAction('[Bookmark Sync] Upload Local Clicked');
export const downloadRemoteClicks = createAction('[Bookmark Sync] Download Remote Clicks');

export const downloadRemoteNew = createAction('[Bookmark Sync] Download Remote New');

export const partialDownloadSuccess = createAction('[Bookmark Sync] Partial Download Success', props<{ count: number }>());
export const partialUploadSuccess = createAction('[Bookmark Sync] Partial Upload Success', props<{ count: number }>());

export const uploadLocalUpdated = createAction('[Bookmark Sync] Upload Local Updated');
export const uploadLocalDeleted = createAction('[Bookmark Sync] Upload Local Deleted');

export const viewRemoteUpdated = createAction('[Bookmark Sync] View Remote Updated');
export const viewRemoteDeleted = createAction('[Bookmark Sync] View Remote Deleted');

export const viewLocalUpdatedRemoteUpdated = createAction('[Bookmark Sync] View Local Updated Remote Updated');
export const viewLocalDeletedRemoteDeleted = createAction('[Bookmark Sync] View Local Deleted Remote Deleted');
export const viewLocalUpdatedRemoteDeleted = createAction('[Bookmark Sync] View Local Updated Remote Deleted');
export const viewLocalDeletedRemoteUpdated = createAction('[Bookmark Sync] View Local Deleted Remote Updated');