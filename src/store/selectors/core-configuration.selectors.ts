import { FirestoreConfig } from '@lib';
import { createSelector } from '@ngrx/store';
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
