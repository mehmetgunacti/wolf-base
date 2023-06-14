import { createAction, props } from "@ngrx/store";

export const syncMessage = createAction('[Sync] Message', props<{ message?: string, inProgress?: boolean }>());