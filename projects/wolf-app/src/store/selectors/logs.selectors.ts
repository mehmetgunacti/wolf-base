import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LogsModuleState } from "store/states/logs.state";

const selLogsModuleState = createFeatureSelector<LogsModuleState>('logs');


// logs entries

const selLogsEntriesState = createSelector(

	selLogsModuleState,
	state => state.entries

);

export const selLogsAll = createSelector(

	selLogsEntriesState,
	state => state.logs.reverse()

);

export const selLogsSelectedCategory = createSelector(

	selLogsEntriesState,
	state => state.selectedCategory

);

// logs ui

const selLogsUIState = createSelector(

	selLogsModuleState,
	state => state.ui

);

export const selLogsFilterPaneVisibility = createSelector(

	selLogsUIState,
	state => state.filterPaneVisible

);