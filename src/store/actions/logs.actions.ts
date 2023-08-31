import { createAction, props } from "@ngrx/store";
import { LogMessage } from "lib";

export const loadLogsSuccess = createAction('[Logs] Load Logs Success', props<{ logs: LogMessage[] }>());

export const clearLogs = createAction('[Logs] Clear Logs');