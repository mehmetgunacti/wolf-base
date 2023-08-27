import { createAction, props } from '@ngrx/store';
import { Entity, RemoteData, RemoteMetadata, SyncData, UUID } from 'lib';

export const loadSyncDataSuccess = createAction('[Bookmark Stats] Load SyncData Success', props<{ syncData: SyncData[] }>());
export const loadRemoteMetadataSuccess = createAction('[Bookmark Stats] Load RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());
export const loadTrashCountSuccess = createAction('[Bookmark Stats] Load Trash Count Success', props<{ count: number }>());

export const downloadRemoteMetadata = createAction('[Bookmark Stats] Download RemoteMetadata');
export const downloadRemoteMetadataSuccess = createAction('[Bookmark Stats] Download RemoteMetadata Success');

export const uploadLocalNew = createAction('[Bookmark Stats] Upload Local New');
export const uploadLocalNewSuccess = createAction('[Bookmark Stats] Upload Local New Success', props<{ count: number }>());

export const downloadRemoteNew = createAction('[Bookmark Stats] Download Remote New');

export const uploadLocalClicked = createAction('[Bookmark Stats] Upload Local Clicked');
export const downloadRemoteClicks = createAction('[Bookmark Stats] Download Remote Clicks');

export const partialDownloadSuccess = createAction('[Bookmark Stats] Partial Download Success', props<{ count: number }>());
export const partialUploadSuccess = createAction('[Bookmark Stats] Partial Upload Success', props<{ count: number }>());

export const uploadLocalUpdated = createAction('[Bookmark Stats] Upload Local Updated');
export const uploadLocalDeleted = createAction('[Bookmark Stats] Upload Local Deleted');

export const viewRemoteUpdated = createAction('[Bookmark Stats] View Remote Updated');
export const viewRemoteDeleted = createAction('[Bookmark Stats] View Remote Deleted');

export const viewLocalUpdatedRemoteUpdated = createAction('[Bookmark Stats] View Local Updated Remote Updated');
export const viewLocalDeletedRemoteDeleted = createAction('[Bookmark Stats] View Local Deleted Remote Deleted');
export const viewLocalUpdatedRemoteDeleted = createAction('[Bookmark Stats] View Local Updated Remote Deleted');
export const viewLocalDeletedRemoteUpdated = createAction('[Bookmark Stats] View Local Deleted Remote Updated');

export const purgeLocalItem = createAction('[Bookmark Stats] Purge Local Item', props<{ id: UUID }>());
export const purgeRemoteItem = createAction('[Bookmark Stats] Purge Remote Item', props<{ id: UUID }>());
export const overrideLocalItem = createAction('[Bookmark Stats] Override Local Item', props<{ remoteData: RemoteData<Entity> }>());
export const overrideRemoteItem = createAction('[Bookmark Stats] Override Remote Item', props<{ entity: Entity }>());

export const downloadRemoteData = createAction('[Bookmark Stats] Donwload RemoteData', props<{ id: UUID }>());
export const downloadRemoteDataSuccess = createAction('[Bookmark Stats] Donwload RemoteData Success', props<{ remoteData: RemoteData<Entity> }>());
export const downloadRemoteDataFailure = createAction('[Bookmark Stats] Donwload RemoteData Failure');

export const loadFirstConflict = createAction('[Sync] Load First Conflict');
export const loadFirstConflictSuccess = createAction('[Sync] Load First Conflict Success', props<{ syncData: SyncData }>());

export const loadItemSuccess = createAction('[Sync] Load Item Success', props<{ item: Entity }>());
export const loadTrashItemSuccess = createAction('[Sync] Load Trash Item Success', props<{ item: Entity | null }>());
