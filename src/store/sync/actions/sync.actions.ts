import { createAction, props } from "@ngrx/store";
import { SyncEvent } from "lib";

export const syncSetState = createAction('[Sync] set sync state', props<{ message: SyncEvent }>());
export const syncStart = createAction('[Sync] Start');