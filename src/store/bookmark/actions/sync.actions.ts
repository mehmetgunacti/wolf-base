import { createAction, props } from "@ngrx/store";
import { SyncData } from "lib";

export const bookmarksSyncSuccess = createAction('[Bookmarks] SyncData Load Success', props<{ syncData: SyncData[] }>());
export const bookmarksTrashCountSuccess = createAction('[Bookmarks] Trash Count Success', props<{ count: number }>());