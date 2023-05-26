import { createSelector } from '@ngrx/store';
import { CoreModuleState } from '../states';
import { UIState } from '../states/ui.state';
import { coreModuleState } from './module.selector';

export const uiState = createSelector(

	coreModuleState,
	(state: CoreModuleState): UIState => state.ui

);

export const themeInfo = createSelector(

	uiState,
	(state: UIState) => state.theme.info

);

export const isBigScreen = createSelector(

	uiState,
	(state: UIState) => state.bigScreen

);
