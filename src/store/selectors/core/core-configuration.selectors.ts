import { createSelector } from '@ngrx/store';
import { FirestoreConfig } from '@models';
import { CoreConfigurationState, CoreModuleState } from '@states';
import { coreModuleState } from './core.selectors';

const confState = createSelector(

	coreModuleState,
	(state: CoreModuleState): CoreConfigurationState => state.conf

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
