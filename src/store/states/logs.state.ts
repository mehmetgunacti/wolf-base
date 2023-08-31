import { LogMessage } from "lib";

export interface LogsModuleState {

	logs: LogMessage[];

}

export const initialLogsState: LogsModuleState = {

	logs: []

};