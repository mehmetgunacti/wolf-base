import { ActionReducerMap } from "@ngrx/store";
import { Logs_ModuleState } from "store/states/logs.state";
import { logsEntriesReducer } from "./logs-entries.reducer";
import { logsUIReducer } from "./logs-ui.reducer";

export const logsReducer: ActionReducerMap<Logs_ModuleState> = {

	entries: logsEntriesReducer,
	ui: logsUIReducer

}
