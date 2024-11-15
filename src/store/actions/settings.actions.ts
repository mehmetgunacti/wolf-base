import { FirestoreConfig } from '@models/configuration.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const settingsActions = createActionGroup({

	source: 'Settings',
	events: {

		saveFirestoreConfig					: props<{ config: FirestoreConfig }>(),
		saveFirestoreConfigSuccess			: emptyProps(),

		saveTitleLookup						: props<{ url: string }>(),
		saveTitleLookupSuccess				: emptyProps(),

		savePopularBookmarksConfig			: props<{ tags: string[] }>(),
		savePopularBookmarksConfigSuccess	: emptyProps(),

		savePinnedNotesConfig				: props<{ tags: string[] }>(),
		savePinnedNotesConfigSuccess		: emptyProps()

	}

});
