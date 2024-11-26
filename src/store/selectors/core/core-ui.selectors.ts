import { createSelector } from '@ngrx/store';
import { CoreModuleState, CoreUIState } from '@states/core.state';
import { coreModuleState } from './core.selectors';

export const selCore_uiState = createSelector(

	coreModuleState,
	(state: CoreModuleState): CoreUIState => state.ui

);

export const selCore_isBigScreen = createSelector(

	selCore_uiState,
	(state: CoreUIState) => state.bigScreen

);

export const selCore_sidebarState = createSelector(

	selCore_uiState,
	(state: CoreUIState) => state.sidebarState

);

export const selCore_theme = createSelector(

	selCore_uiState,
	(state: CoreUIState) => state.theme

);

export const selCore_now = createSelector(

	selCore_uiState,
	(state: CoreUIState) => state.now

);

export const selCore_progressVisible = createSelector(

	selCore_uiState,
	(state: CoreUIState) => state.progressCounter !== 0

);
