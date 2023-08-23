import { createAction, props } from '@ngrx/store';
import { Bookmark, RemoteData, RemoteMetadata, SyncData } from 'lib';

export const loadSyncDataSuccess = createAction('[Bookmark Sync] Load SyncData Success', props<{ syncData: SyncData[] }>());
export const loadRemoteMetadataSuccess = createAction('[Bookmark Sync] Load RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());
export const loadTrashCountSuccess = createAction('[Bookmark Sync] Load Trash Count Success', props<{ count: number }>());

export const downloadRemoteMetadata = createAction('[Bookmark Sync] Download RemoteMetadata');
export const downloadRemoteMetadataSuccess = createAction('[Bookmark Sync] Download RemoteMetadata Success');

export const uploadLocalNew = createAction('[Bookmark Sync] Upload Local New');
export const uploadLocalNewSuccess = createAction('[Bookmark Sync] Upload Local New', props<{ remoteData: RemoteData<Bookmark>[] }>());

export const downloadRemoteNew = createAction('[Bookmark Sync] Download Remote New');
export const partialDownloadSuccess = createAction('[Bookmark Sync] Partial Download Success', props<{ count: number }>());
