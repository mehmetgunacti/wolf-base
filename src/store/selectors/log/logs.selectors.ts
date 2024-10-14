import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Logs_ModuleState } from '@states';

const selLogs_moduleState = createFeatureSelector<Logs_ModuleState>('logs');

const selLogs_entriesState = createSelector(

	selLogs_moduleState,
	state => state.entries

);

export const selLogs_allEntries = createSelector(

	selLogs_entriesState,
	state => state.logs //.reverse()

);

// logs ui

export const selLogs_uiState = createSelector(

	selLogs_moduleState,
	state => state.ui

);

export const selLogs_selectedId = createSelector(

	selLogs_uiState,
	state => state.selectedId

);
