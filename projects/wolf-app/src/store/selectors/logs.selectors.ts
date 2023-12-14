import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogsModuleState } from 'store/states/logs.state';

const selLogsModuleState = createFeatureSelector<LogsModuleState>('logs');

const selLogsEntriesState = createSelector(

	selLogsModuleState,
	state => state.entries

);

export const selLogsAll = createSelector(

	selLogsEntriesState,
	state => state.logs //.reverse()

);

// logs ui

const selLogsUIState = createSelector(

	selLogsModuleState,
	state => state.ui

);
