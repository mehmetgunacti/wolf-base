import { createSelector } from '@ngrx/store';
import { FirestoreConfig } from 'lib';
import { CoreConfigurationState, CoreModuleState } from 'store/states/core.state';
import { coreModuleState } from './core.selectors';

export const confState = createSelector(

	coreModuleState,
	(state: CoreModuleState): CoreConfigurationState => state.conf

);

export const isInitialized = createSelector(

	confState,
	(state: CoreConfigurationState) => state.initialized

);

export const isSidebarVisible = createSelector(

	confState,
	(state: CoreConfigurationState) => state.sidebarVisible

);

export const isThemeDark = createSelector(

	confState,
	(state: CoreConfigurationState) => state.darkTheme

);

export const isFirestoreApiKeyMissing = createSelector(

	confState,
	(state: CoreConfigurationState) => !state.apiKey

);

export const firestoreConfig = createSelector(

	confState,
	({ apiKey, baseURL, projectId }): FirestoreConfig => ({ apiKey, baseURL, projectId })

);

export const titleLookup = createSelector(

	confState,
	(state: CoreConfigurationState) => state.titleLookupUrl

);
