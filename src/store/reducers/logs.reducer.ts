import { ActionReducerMap } from "@ngrx/store";
import { LogsModuleState } from "store/states/logs.state";
import { logsEntriesReducer } from "./logs-entries.reducer";
import { logsUIReducer } from "./logs-ui.reducer";

export const logsReducer: ActionReducerMap<LogsModuleState> = {

	entries: logsEntriesReducer,
	ui: logsUIReducer

}