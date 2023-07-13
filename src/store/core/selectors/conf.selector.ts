import { createSelector } from '@ngrx/store';
import { ConfState, CoreModuleState } from '../states';
import { coreModuleState } from './module.selector';
import { state } from '@angular/animations';
import { Credentials } from 'lib';

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

export const isThemeDark = createSelector(

	confState,
	(state: ConfState) => state.darkTheme

);

export const isApiKeyAvailable = createSelector(

	confState,
	(state: ConfState) => !!state.apiKey

);

export const getCredentials = createSelector(

	confState,
	({ apiKey, baseURL, projectId }): Credentials => ({ apiKey, baseURL, projectId })

);
