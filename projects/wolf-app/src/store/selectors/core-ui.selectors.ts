import { createSelector } from '@ngrx/store';
import { coreModuleState } from './core.selectors';
import { CoreModuleState, CoreUIState } from 'store/states/core.state';

export const selCoreUIState = createSelector(

	coreModuleState,
	(state: CoreModuleState): CoreUIState => state.ui

);

export const selCoreIsBigScreen = createSelector(

	selCoreUIState,
	(state: CoreUIState) => state.bigScreen

);
