import { LogCategory, LogMessage } from "@lib";

export interface LogsModuleState {

	entries: LogsEntriesState;
	ui: LogsUIState;

}

export interface LogsEntriesState {

	logs: LogMessage[];
	selectedCategory: LogCategory | null;

}

export interface LogsUIState {

	filterPaneVisible: boolean;

}

export const initialLogsEntriesState: LogsEntriesState = {

	logs: [],
	selectedCategory: null

};

export const initialLogsUIState: LogsUIState = {

	filterPaneVisible: false

}

export const initialLogsState: LogsModuleState = {

	entries: initialLogsEntriesState,
	ui: initialLogsUIState

}