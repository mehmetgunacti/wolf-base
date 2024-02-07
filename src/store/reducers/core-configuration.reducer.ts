import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { loadAllSuccess } from 'store/actions/core.actions';
import { CoreConfigurationState, initialCoreConfigurationState } from 'store/states/core.state';

export const coreConfigurationReducer: ActionReducer<CoreConfigurationState, Action> = createReducer(

	initialCoreConfigurationState,
	on(loadAllSuccess, (state, { configuration: { firestoreConfig, titleLookupUrl, popularBookmarks, pinnedNotes } }) => ({

		firestoreConfig,
		titleLookupUrl,
		initialized: true,
		popularBookmarks,
		pinnedNotes

	}))

);
