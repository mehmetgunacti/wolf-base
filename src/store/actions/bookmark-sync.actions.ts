import { createAction, props } from '@ngrx/store';
import { RemoteMetadata, SyncData } from 'lib';

export const loadSyncDataSuccess = createAction('[Bookmark Sync] Load SyncData Success', props<{ syncData: SyncData[] }>());
export const loadRemoteMetadataSuccess = createAction('[Bookmark Sync] Load RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());
export const loadTrashCountSuccess = createAction('[Bookmark Sync] Load Trash Count Success', props<{ count: number }>());

export const doanloadRemoteMetadata = createAction('[Bookmark Sync] Download RemoteMetadata');
export const doanloadRemoteMetadataSuccess = createAction('[Bookmark Sync] Download RemoteMetadata Success');