import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { loadAllSuccess } from 'store/actions/core.actions';
import { saveFirestoreConfig, savePinnedNotesConfig, savePopularBookmarksConfig, saveTitleLookup } from 'store/actions/settings.actions';
import { CoreConfigurationState, initialCoreConfigurationState } from 'store/states/core.state';

export const coreConfigurationReducer: ActionReducer<CoreConfigurationState, Action> = createReducer(

	initialCoreConfigurationState,
	on(loadAllSuccess, (state, { configuration: { firestoreConfig, titleLookupUrl, popularBookmarks, pinnedNotes } }) => ({

		firestoreConfig,
		titleLookupUrl,
		initialized: true,
		popularBookmarks,
		pinnedNotes

	})),
	on(saveFirestoreConfig, (state, { config }): CoreConfigurationState => ({ ...state, firestoreConfig: config })),
	on(saveTitleLookup, (state, { url }): CoreConfigurationState => ({ ...state, titleLookupUrl: url })),
	on(savePinnedNotesConfig, (state, { tags }): CoreConfigurationState => ({ ...state, pinnedNotes: tags })),
	on(savePopularBookmarksConfig, (state, { tags }): CoreConfigurationState => ({ ...state, popularBookmarks: tags })),

);
