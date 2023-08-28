import { createAction, props } from '@ngrx/store';
import { Bookmark, Entity, RemoteData, RemoteMetadata, SyncData, UUID } from 'lib';

export const downloadRemoteMetadata = createAction('[Stats Bookmark] Download RemoteMetadata');
export const downloadRemoteMetadataSuccess = createAction('[Stats Bookmark] Download RemoteMetadata Success');

export const uploadLocalNew = createAction('[Stats Bookmark] Upload Local New');
export const uploadLocalNewSuccess = createAction('[Stats Bookmark] Upload Local New Success', props<{ count: number }>());

export const uploadLocalClicked = createAction('[Stats Bookmark] Upload Local Clicked');
export const downloadRemoteClicks = createAction('[Stats Bookmark] Download Remote Clicks');

export const downloadRemoteNew = createAction('[Stats Bookmark] Download Remote New');

export const partialDownloadSuccess = createAction('[Stats Bookmark] Partial Download Success', props<{ count: number }>());
export const partialUploadSuccess = createAction('[Stats Bookmark] Partial Upload Success', props<{ count: number }>());

export const uploadLocalUpdated = createAction('[Stats Bookmark] Upload Local Updated');
export const uploadLocalDeleted = createAction('[Stats Bookmark] Upload Local Deleted');

export const viewLocalUntouchedRemoteUpdated = createAction('[Stats Bookmark] View Local Untouched Remote Updated');
export const viewLocalUntouchedRemoteUpdatedSuccess = createAction('[Stats Bookmark] View Local Untouched Remote Updated Success', props<{ syncData: SyncData | null, bookmark: Bookmark | null, remoteMetadata: RemoteMetadata | null }>());

export const viewLocalUntouchedRemoteDeleted = createAction('[Stats Bookmark] View Local Untouched Remote Deleted');
export const viewLocalUntouchedRemoteDeletedSuccess = createAction('[Stats Bookmark] View Local Untouched Remote Deleted Success', props<{ syncData: SyncData | null, bookmark: Bookmark | null }>());

export const viewLocalUpdatedRemoteUpdated = createAction('[Stats Bookmark] View Local Updated Remote Updated');
export const viewLocalDeletedRemoteDeleted = createAction('[Stats Bookmark] View Local Deleted Remote Deleted');
export const viewLocalUpdatedRemoteDeleted = createAction('[Stats Bookmark] View Local Updated Remote Deleted');
export const viewLocalDeletedRemoteUpdated = createAction('[Stats Bookmark] View Local Deleted Remote Updated');

export const purgeLocalItem = createAction('[Stats Bookmark] Purge Local Item', props<{ id: UUID }>());
export const purgeRemoteItem = createAction('[Stats Bookmark] Purge Remote Item', props<{ id: UUID }>());
export const overrideLocalItem = createAction('[Stats Bookmark] Override Local Item', props<{ remoteData: RemoteData<Entity> }>());
export const overrideRemoteItem = createAction('[Stats Bookmark] Override Remote Item', props<{ entity: Entity }>());

export const downloadRemoteData = createAction('[Stats Bookmark] Donwload RemoteData', props<{ id: UUID }>());
export const downloadRemoteDataSuccess = createAction('[Stats Bookmark] Donwload RemoteData Success', props<{ remoteData: RemoteData<Entity> }>());
export const downloadRemoteDataFailure = createAction('[Stats Bookmark] Donwload RemoteData Failure');

export const loadEntitySuccess = createAction('[Stats Bookmark] Load Item Success', props<{ entity: Entity }>());
export const loadTrashEntitySuccess = createAction('[Stats Bookmark] Load Trash Item Success', props<{ entity: Entity | null }>());
