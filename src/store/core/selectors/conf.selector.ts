import { createSelector } from '@ngrx/store';
import { ConfState, CoreModuleState } from '../states';
import { coreModuleState } from './module.selector';
import { state } from '@angular/animations';
import { FirestoreConfig } from 'lib';

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

export const isFirestoreApiKeyMissing = createSelector(

	confState,
	(state: ConfState) => !state.apiKey

);

export const getFirestoreConfig = createSelector(

	confState,
	({ apiKey, baseURL, projectId }): FirestoreConfig => ({ apiKey, baseURL, projectId })

);
