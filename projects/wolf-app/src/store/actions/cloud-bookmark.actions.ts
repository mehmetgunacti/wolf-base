import { createAction, props } from '@ngrx/store';
import { Bookmark, Entity, RemoteData, RemoteMetadata, SyncData, UUID } from '@lib';

export const downloadRemoteMetadata = createAction('[Cloud Bookmark] Download RemoteMetadata');

export const uploadNew = createAction('[Cloud Bookmark] Upload New');
export const downloadNew = createAction('[Cloud Bookmark] Download New');

export const uploadUpdated = createAction('[Cloud Bookmark] Upload Updated');
export const uploadDeleted = createAction('[Cloud Bookmark] Upload Deleted');

export const downloadUpdated = createAction('[Cloud Bookmark] Download Updated');
export const downloadDeleted = createAction('[Cloud Bookmark] Download Deleted');

export const uploadClicks = createAction('[Cloud Bookmark] Upload Clicks');
export const downloadClicks = createAction('[Cloud Bookmark] Download Clicks');

export const deleteMetadata = createAction('[Cloud Bookmark] Delete Metadata');

export const forceUploadUpdated = createAction('[Cloud Bookmark] Force Upload Updated');
export const forceDownloadUpdated = createAction('[Cloud Bookmark] Force Download Updated');

export const forceUploadDeleted = createAction('[Cloud Bookmark] Force Upload Deleted');



export const viewLocalUpdatedRemoteUpdatedSuccess = createAction('[Cloud Bookmark] View Local Updated Remote Updated Success', props<{ syncData: SyncData | null, bookmark: Bookmark | null, remoteMetadata: RemoteMetadata | null }>());


// export const viewLocalDeletedRemoteDeletedSuccess = createAction('[Cloud Bookmark] View Local Deleted Remote Deleted Success', props<{ syncData: SyncData | null, trashItem: Bookmark | null }>());

export const viewLocalUpdatedRemoteDeleted = createAction('[Cloud Bookmark] View Local Updated Remote Deleted');
export const viewLocalUpdatedRemoteDeletedSuccess = createAction('[Cloud Bookmark] View Local Updated Remote Deleted Success', props<{ syncData: SyncData | null, bookmark: Bookmark | null }>());

export const viewLocalUpdatedRemoteUpdated = createAction('[Cloud Bookmark] View Local Updated Remote Updated');

export const viewLocalDeletedRemoteUpdated = createAction('[Cloud Bookmark] View Local Deleted Remote Updated');
export const viewLocalDeletedRemoteUpdatedSuccess = createAction('[Cloud Bookmark] View Local Deleted Remote Updated Success', props<{ syncData: SyncData | null, trashItem: Bookmark | null, remoteMetadata: RemoteMetadata | null }>());

export const purgeLocalItem = createAction('[Cloud Bookmark] Purge Local Item', props<{ id: UUID }>());
export const purgeRemoteItem = createAction('[Cloud Bookmark] Purge Remote Item', props<{ id: UUID }>());

export const overrideLocalItem = createAction('[Cloud Bookmark] Override Local Item');
export const overrideRemoteItem = createAction('[Cloud Bookmark] Override Remote Item');

export const downloadRemoteData = createAction('[Cloud Bookmark] Donwload RemoteData', props<{ id: UUID }>());
export const downloadRemoteDataSuccess = createAction('[Cloud Bookmark] Donwload RemoteData Success', props<{ remoteData: RemoteData<Entity> }>());
export const downloadRemoteDataFailure = createAction('[Cloud Bookmark] Donwload RemoteData Failure');

export const loadEntitySuccess = createAction('[Cloud Bookmark] Load Item Success', props<{ entity: Entity }>());
export const loadTrashEntitySuccess = createAction('[Cloud Bookmark] Load Trash Item Success', props<{ entity: Entity | null }>());
