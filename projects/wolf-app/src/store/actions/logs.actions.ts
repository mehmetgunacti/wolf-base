import { createAction, props } from "@ngrx/store";
import { LogCategory, LogMessage } from "lib";

export const loadLogs = createAction('[Logs] Load Logs');
export const loadLogsSuccess = createAction('[Logs] Load Logs Success', props<{ logs: LogMessage[] }>());

export const clearLogs = createAction('[Logs] Clear Logs');

export const toggleFilterPane = createAction('[Logs] Toggle Filter Pane');

export const setSelectedCategory = createAction('[Logs] Set Selected Category', props<{ category: LogCategory }>());