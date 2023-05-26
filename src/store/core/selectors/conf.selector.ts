import { createSelector } from '@ngrx/store';
import { ConfState, CoreModuleState } from '../states';
import { coreModuleState } from './module.selector';

export const confState = createSelector(

	coreModuleState,
	(state: CoreModuleState): ConfState => state.conf

);

export const isSidebarVisible = createSelector(

	confState,
	(state: ConfState) => state.sidebarVisible

);
