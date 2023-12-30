import { LogMessage } from '@lib';


export interface LogsModuleState {

	entries: LogsEntriesState;
	ui: LogsUIState;

}

export interface LogsEntriesState {

	logs: LogMessage[];

}

export interface LogsUIState {
}

export const initialLogsEntriesState: LogsEntriesState = {

	logs: []

};

export const initialLogsUIState: LogsUIState = {
}

export const initialLogsState: LogsModuleState = {

	entries: initialLogsEntriesState,
	ui: initialLogsUIState

}
