import { createSelector } from '@ngrx/store';
import { coreModuleState } from './module.selector';
import { CoreModuleState, CoreUIState } from 'store/states/core.state';

export const uiState = createSelector(

	coreModuleState,
	(state: CoreModuleState): CoreUIState => state.ui

);

export const isBigScreen = createSelector(

	uiState,
	(state: CoreUIState) => state.bigScreen

);
