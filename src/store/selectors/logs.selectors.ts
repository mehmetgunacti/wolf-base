import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LogsModuleState } from "store/states/logs.state";

const selLogsModuleState = createFeatureSelector<LogsModuleState>('logs');

export const selLogsAll = createSelector(

	selLogsModuleState,
	state => state.logs.reverse()

);