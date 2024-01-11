import { LogCategory, LogMessage, UUID } from '@lib';


export interface Logs_ModuleState {

	entries: Logs_EntriesState;
	ui: Logs_UIState;

}

export interface Logs_EntriesState {

	logs: LogMessage[];

}

export interface Logs_UIState {

	categories: LogCategory[],
	selectedId: UUID | null;
	limit: number;

}

export const initialLogsEntriesState: Logs_EntriesState = {

	logs: []

};

export const initialLogsUIState: Logs_UIState = {

	categories: [LogCategory.notification],
	selectedId: null,
	limit: 100

}

export const initialLogsState: Logs_ModuleState = {

	entries: initialLogsEntriesState,
	ui: initialLogsUIState

}
