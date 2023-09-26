import { createAction, props } from "@ngrx/store";
import { CloudTaskType, WolfEntity } from "lib";

export const openConflictDialog = createAction('[Cloud] Open Conflict Dialog');
export const closeConflictDialog = createAction('[Cloud] Close Conflict Dialog');

export const downloadSuccess = createAction('[Cloud Bookmark] Download Success', props<{ count: number }>());
export const uploadSuccess = createAction('[Cloud Bookmark] Upload Success', props<{ count: number }>());
export const deleteSuccess = createAction('[Cloud Bookmark] Delete Success', props<{ count: number }>());

export const cloudTaskAction = createAction('[Cloud] Task Action', props<{ entity: WolfEntity, taskType: CloudTaskType }>());