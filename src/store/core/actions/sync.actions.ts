import { createAction, props } from "@ngrx/store";
import { SyncState } from "lib";

export const syncSetState = createAction('[Sync] set sync state', props<{ syncState: SyncState }>());
