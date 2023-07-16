import { createAction, props } from "@ngrx/store";
import { SyncData, SyncEvent } from "lib";

export const syncTrigger = createAction('[Sync] Trigger');
export const syncEvent = createAction('[Sync] Message', props<SyncEvent>());

export const showFirestoreDialog = createAction('[Sync] Show Firestore Dialog');
export const closeFirestoreDialog = createAction('[Sync] Close Firestore Dialog');

export const bookmarksSyncSuccess = createAction('[Sync] Bookmarks Sync Success', props<{ syncData: SyncData[] }>());
export const bookmarksTrashCountSuccess = createAction('[Sync] Bookmarks Trash Count Success', props<{ count: number }>());