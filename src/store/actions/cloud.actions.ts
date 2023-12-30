import { createAction, props } from "@ngrx/store";

export const openConflictDialog = createAction('[Cloud] Open Conflict Dialog');
export const closeConflictDialog = createAction('[Cloud] Close Conflict Dialog');

export const downloadSuccess = createAction('[Cloud] Download Success', props<{ count: number }>());
export const uploadSuccess = createAction('[Cloud] Upload Success', props<{ count: number }>());
export const deleteSuccess = createAction('[Cloud] Delete Success', props<{ count: number }>());

export const startSync = createAction('[Cloud] Start Sync');
