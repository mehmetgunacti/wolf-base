import { Action, ActionReducer, createReducer, on } from "@ngrx/store";
import { loadLogsSuccess } from "store/actions/logs.actions";
import { LogsModuleState, initialLogsState } from "store/states/logs.state";

export const logsReducer: ActionReducer<LogsModuleState, Action> = createReducer(

	initialLogsState,
	on(loadLogsSuccess, (state, { logs }): LogsModuleState => ({ ...state, logs }))

);