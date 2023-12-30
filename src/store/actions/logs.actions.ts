import { createAction, props } from "@ngrx/store";
import { LogCategory, LogMessage, UUID } from '@lib';

export const loadLogs = createAction('[Logs] Load Logs', props<{ entityId?: UUID, category?: LogCategory }>());
export const loadLogsSuccess = createAction('[Logs] Load Logs Success', props<{ logs: LogMessage[] }>());

export const clearLogs = createAction('[Logs] Clear Logs');
