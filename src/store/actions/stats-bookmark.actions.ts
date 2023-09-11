import { createAction, props } from '@ngrx/store';
import { Bookmark, Entity, RemoteData, RemoteMetadata, SyncData, UUID } from 'lib';

export const downloadRemoteMetadata = createAction('[Stats Bookmark] Download RemoteMetadata');

export const uploadNew = createAction('[Stats Bookmark] Upload New');
export const downloadNew = createAction('[Stats Bookmark] Download New');

export const uploadUpdated = createAction('[Stats Bookmark] Upload Updated');
export const uploadDeleted = createAction('[Stats Bookmark] Upload Deleted');

export const downloadUpdated = createAction('[Stats Bookmark] Download Updated');
export const downloadDeleted = createAction('[Stats Bookmark] Download Deleted');

export const uploadClicks = createAction('[Stats Bookmark] Upload Clicks');
export const downloadClicks = createAction('[Stats Bookmark] Download Clicks');

export const deletePermanently = createAction('[Stats Bookmark] Delete Permanently');

export const forceUploadUpdated = createAction('[Stats Bookmark] Force Upload Updated');
export const forceDownloadUpdated = createAction('[Stats Bookmark] Force Download Updated');

export const forceUploadDeleted = createAction('[Stats Bookmark] Force Upload Deleted');



export const viewLocalUpdatedRemoteUpdatedSuccess = createAction('[Stats Bookmark] View Local Updated Remote Updated Success', props<{ syncData: SyncData | null, bookmark: Bookmark | null, remoteMetadata: RemoteMetadata | null }>());


// export const viewLocalDeletedRemoteDeletedSuccess = createAction('[Stats Bookmark] View Local Deleted Remote Deleted Success', props<{ syncData: SyncData | null, trashItem: Bookmark | null }>());

export const viewLocalUpdatedRemoteDeleted = createAction('[Stats Bookmark] View Local Updated Remote Deleted');
export const viewLocalUpdatedRemoteDeletedSuccess = createAction('[Stats Bookmark] View Local Updated Remote Deleted Success', props<{ syncData: SyncData | null, bookmark: Bookmark | null }>());

export const viewLocalUpdatedRemoteUpdated = createAction('[Stats Bookmark] View Local Updated Remote Updated');

export const viewLocalDeletedRemoteUpdated = createAction('[Stats Bookmark] View Local Deleted Remote Updated');
export const viewLocalDeletedRemoteUpdatedSuccess = createAction('[Stats Bookmark] View Local Deleted Remote Updated Success', props<{ syncData: SyncData | null, trashItem: Bookmark | null, remoteMetadata: RemoteMetadata | null }>());

export const purgeLocalItem = createAction('[Stats Bookmark] Purge Local Item', props<{ id: UUID }>());
export const purgeRemoteItem = createAction('[Stats Bookmark] Purge Remote Item', props<{ id: UUID }>());

export const overrideLocalItem = createAction('[Stats Bookmark] Override Local Item');
export const overrideRemoteItem = createAction('[Stats Bookmark] Override Remote Item');

export const downloadRemoteData = createAction('[Stats Bookmark] Donwload RemoteData', props<{ id: UUID }>());
export const downloadRemoteDataSuccess = createAction('[Stats Bookmark] Donwload RemoteData Success', props<{ remoteData: RemoteData<Entity> }>());
export const downloadRemoteDataFailure = createAction('[Stats Bookmark] Donwload RemoteData Failure');

export const loadEntitySuccess = createAction('[Stats Bookmark] Load Item Success', props<{ entity: Entity }>());
export const loadTrashEntitySuccess = createAction('[Stats Bookmark] Load Trash Item Success', props<{ entity: Entity | null }>());
