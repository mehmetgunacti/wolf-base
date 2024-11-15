import { coreActions } from '@actions/core.actions';
import { settingsActions } from '@actions/settings.actions';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CoreConfigurationState, initialCoreConfigurationState } from '@states/core.state';

export const coreConfigurationReducer: ActionReducer<CoreConfigurationState, Action> = createReducer(

	initialCoreConfigurationState,
	on(coreActions.loadAllSuccess, (state, { configuration: { firestoreConfig, titleLookupUrl, popularBookmarks, pinnedNotes } }) => ({

		firestoreConfig,
		titleLookupUrl,
		initialized: true,
		popularBookmarks,
		pinnedNotes

	})),
	on(settingsActions.saveFirestoreConfig, (state, { config }): CoreConfigurationState => ({ ...state, firestoreConfig: config })),
	on(settingsActions.saveTitleLookup, (state, { url }): CoreConfigurationState => ({ ...state, titleLookupUrl: url })),
	on(settingsActions.savePinnedNotesConfig, (state, { tags }): CoreConfigurationState => ({ ...state, pinnedNotes: tags })),
	on(settingsActions.savePopularBookmarksConfig, (state, { tags }): CoreConfigurationState => ({ ...state, popularBookmarks: tags })),

);
