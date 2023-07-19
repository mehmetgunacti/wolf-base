import { createAction, props } from "@ngrx/store";
import { SyncEvent } from "lib";

export class SyncActions {

    static syncTrigger = createAction('[Sync] Trigger');
    static syncEvent = createAction('[Sync] Message', props<SyncEvent>());

}