import { FirestoreConfig } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const settingsActions = createActionGroup({

	source: 'Settings',
	events: {

		'Save Firestore Config'					: props<{ config: FirestoreConfig }>(),
		'Save Firestore Config Success'			: emptyProps(),

		'Save Title Lookup'						: props<{ url: string }>(),
		'Save Title Lookup Success'				: emptyProps(),

		'Save Popular Bookmarks Config'			: props<{ tags: string[] }>(),
		'Save Popular Bookmarks Config Success'	: emptyProps(),

		'Save Pinned Notes Config'				: props<{ tags: string[] }>(),
		'Save Pinned Notes Config Success'		: emptyProps()

	}

});
