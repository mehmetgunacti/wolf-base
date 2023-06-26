import { createAction, props } from "@ngrx/store";
import { SyncEvent } from "lib";

export const syncTrigger = createAction('[Sync] Trigger');
export const syncEvent = createAction('[Sync] Message', props<SyncEvent>());