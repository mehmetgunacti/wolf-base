import { UUID } from '@constants/common.constant';
import { LogCategory } from '@constants/log.constant';
import { LogMessage } from '@models/log.model';

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

export const log_initialUIState: Logs_UIState = {

	categories: [ LogCategory.notification ],
	selectedId: null,
	limit: 100

};

export const log_initialState: Logs_ModuleState = {

	entries: initialLogsEntriesState,
	ui: log_initialUIState

};
