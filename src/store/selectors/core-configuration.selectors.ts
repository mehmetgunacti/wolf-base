import { createSelector } from '@ngrx/store';
import { DEFAULT_CONF_VALUES, FirestoreConfig } from 'lib';
import { CoreConfigurationState, CoreModuleState } from 'store/states/core.state';
import { coreModuleState } from './core.selectors';

const confState = createSelector(

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
	(state: CoreConfigurationState) => state.darkTheme ?? DEFAULT_CONF_VALUES.darkTheme

);

export const firestoreConfig = createSelector(

	confState,
	({ firestoreConfig }): FirestoreConfig | null => firestoreConfig

);

export const isFirestoreConfigMissing = createSelector(

	firestoreConfig,
	(conf: FirestoreConfig | null) => !conf

);

export const titleLookup = createSelector(

	confState,
	(state: CoreConfigurationState) => state.titleLookupUrl

);
