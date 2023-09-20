import { createAction, props } from "@ngrx/store";

export const openConflictDialog = createAction('[Cloud] Open Conflict Dialog');
export const closeConflictDialog = createAction('[Cloud] Close Conflict Dialog');

export const downloadSuccess = createAction('[Cloud Bookmark] Download Success', props<{ count: number }>());
export const uploadSuccess = createAction('[Cloud Bookmark] Upload Success', props<{ count: number }>());
export const deleteSuccess = createAction('[Cloud Bookmark] Delete Success', props<{ count: number }>());
