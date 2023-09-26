import { createSelector } from '@ngrx/store';
import { DEFAULT_CONF_VALUES, FirestoreConfig } from 'lib';
import { CoreConfigurationState, CoreModuleState } from 'store/states/core.state';
import { coreModuleState } from './core.selectors';

const confState = createSelector(

	coreModuleState,
	(state: CoreModuleState): CoreConfigurationState => state.conf

);

export const selCoreIsInitialized = createSelector(

	confState,
	(state: CoreConfigurationState) => state.initialized

);

export const selCoreIsSidebarVisible = createSelector(

	confState,
	(state: CoreConfigurationState) => state.sidebarVisible

);

export const selCoreIsThemeDark = createSelector(

	confState,
	(state: CoreConfigurationState) => state.darkTheme ?? DEFAULT_CONF_VALUES.darkTheme

);

export const selCoreFirestoreConfig = createSelector(

	confState,
	({ firestoreConfig }): FirestoreConfig | null => firestoreConfig

);

export const selCoreIsFirestoreConfigMissing = createSelector(

	selCoreFirestoreConfig,
	(conf: FirestoreConfig | null) => !conf

);

export const selCoreTitleLookupUrl = createSelector(

	confState,
	(state: CoreConfigurationState) => state.titleLookupUrl

);
