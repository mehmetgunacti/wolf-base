import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FirestoreConfig } from '@models';

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
