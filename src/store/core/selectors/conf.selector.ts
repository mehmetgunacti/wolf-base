import { createSelector } from '@ngrx/store';
import { ConfState, CoreModuleState } from '../states';
import { coreModuleState } from './module.selector';

export const confState = createSelector(

	coreModuleState,
	(state: CoreModuleState): ConfState => state.conf

);

export const isInitialized = createSelector(

	confState,
	(state: ConfState) => state.initialized

);

export const isSidebarVisible = createSelector(

	confState,
	(state: ConfState) => state.sidebarVisible

);

export const theme = createSelector(

	confState,
	(state: ConfState) => state.theme

);
