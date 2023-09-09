import { createAction, props } from "@ngrx/store";

export const openConflictDialog = createAction('[Stats] Open Conflict Dialog');
export const closeConflictDialog = createAction('[Stats] Close Conflict Dialog');

export const downloadSuccess = createAction('[Stats Bookmark] Download Success', props<{ count: number }>());
export const uploadSuccess = createAction('[Stats Bookmark] Upload Success', props<{ count: number }>());
export const deleteSuccess = createAction('[Stats Bookmark] Delete Success', props<{ count: number }>());
