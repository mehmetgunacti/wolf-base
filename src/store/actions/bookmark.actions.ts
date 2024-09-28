import { BookmarkQueryParams, Click, UUID } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const bookmarkActions = createActionGroup({

	source: 'Bookmark',
	events: {

		'From Clipboard'				: emptyProps(),
		'From Clipboard Failure'		: props<{ shaking: boolean }>(),

		// CLICK
		'Click'							: props<{ id: UUID }>(),

		// LOAD FROM LOCAL DATABASE INTO MEMORY
		//// Clicks
		'Load One Click'				: props<{ id: UUID }>(),
		'Load One Click Success'		: props<{ id: UUID, click: Click | null }>(),

		'Load All Clicks'				: emptyProps(),
		'Load All Clicks Success'		: props<{ clicks: Click[] }>(),

		// UI
		'Open Add Bookmark Dialog'		: emptyProps(),
		'Open Edit Bookmark Dialog'		: props<{ id: UUID }>(),
		'Close Edit Bookmark Dialog'	: emptyProps(),

		'Set Selected Id'				: props<{ id: UUID | null }>(),
		'Set Query Params'				: props<BookmarkQueryParams>(),

		// TAGS
		'Toggle Popular Tag'			: props<{ id: UUID }>(),

		'Click Tag'						: props<{ name: string }>(),
		'Set Selected Tags'				: props<{ tags: string[] }>(),
		'Empty Selected Tags'			: emptyProps(),
		'Search'						: props<{ term: string }>(),

		// CLOUD SYNC
		'Upload Clicked'				: emptyProps()

	}

});
