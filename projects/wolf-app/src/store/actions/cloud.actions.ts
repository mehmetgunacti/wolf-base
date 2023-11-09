import { CloudTask, Entity, RemoteData } from '@lib';
import { createAction, props } from "@ngrx/store";

export const openConflictDialog = createAction('[Cloud] Open Conflict Dialog');
export const closeConflictDialog = createAction('[Cloud] Close Conflict Dialog');

export const downloadSuccess = createAction('[Cloud] Download Success', props<{ count: number }>());
export const uploadSuccess = createAction('[Cloud] Upload Success', props<{ count: number }>());
export const deleteSuccess = createAction('[Cloud] Delete Success', props<{ count: number }>());

export const downloadRemoteMetadata = createAction('[Cloud] Download RemoteMetadata');
export const downloadRemoteDataSuccess = createAction('[Cloud] Donwload RemoteData Success', props<{ remoteData: RemoteData<Entity> }>());
export const cloudTaskAction = createAction('[Cloud] Task Action', props<{ task: CloudTask }>());
