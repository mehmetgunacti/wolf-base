import { FirestoreConfig } from '@models/configuration.model';
import { createSelector } from '@ngrx/store';
import { CoreConfigurationState, Core_ModuleState } from '@states/core.state';
import { coreModuleState } from './core.selectors';

const confState = createSelector(

	coreModuleState,
	(state: Core_ModuleState): CoreConfigurationState => state.conf

);

export const selCore_isInitialized = createSelector(

	confState,
	(state: CoreConfigurationState) => state.initialized

);

export const selCore_firestoreConfig = createSelector(

	confState,
	({ firestoreConfig }): FirestoreConfig | null => firestoreConfig

);

export const selCore_isFirestoreConfigMissing = createSelector(

	selCore_firestoreConfig,
	(conf: FirestoreConfig | null) => !conf

);

export const selCore_titleLookupUrl = createSelector(

	confState,
	(state: CoreConfigurationState) => state.titleLookupUrl

);

export const selCore_popularBookmarks = createSelector(

	confState,
	(state: CoreConfigurationState) => state.popularBookmarks

);

export const selCore_pinnedNotes = createSelector(

	confState,
	(state: CoreConfigurationState) => state.pinnedNotes

);
