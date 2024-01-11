import { createAction, props } from "@ngrx/store";
import { LogCategory, LogMessage, UUID } from '@lib';

export const load = createAction('[Logs] Load', props<{ selectedId: UUID | null, categories: LogCategory[], limit?: number }>());
export const loadSuccess = createAction('[Logs] Load Success', props<{ logs: LogMessage[] }>());

export const refresh = createAction('[Logs] Refresh');

export const clearLogs = createAction('[Logs] Clear Logs');

export const setSelectedId = createAction('[Logs] Set Selected', props<{ id: UUID | null }>());
