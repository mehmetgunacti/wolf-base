import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UUID } from '@constants';
import { BookmarkQueryParams, Click } from '@models';

export const bookmarkActions = createActionGroup({

	source: 'Bookmark',
	events: {

		fromClipboard				: emptyProps(),
		fromClipboardFailure		: props<{ shaking: boolean }>(),

		// CLICK
		click						: props<{ id: UUID }>(),

		// LOAD FROM LOCAL DATABASE INTO MEMORY
		//// Clicks
		loadOneClick				: props<{ id: UUID }>(),
		loadOneClickSuccess			: props<{ id: UUID, click: Click | null }>(),

		loadAllClicks				: emptyProps(),
		loadAllClicksSuccess		: props<{ clicks: Click[] }>(),

		// UI
		openFormDialog				: emptyProps(),
		closeFormDialog				: emptyProps(),
		openEditBookmarkDialog		: props<{ id: UUID }>(),

		setSelectedId				: props<{ id: UUID | null }>(),
		setQueryParams				: props<BookmarkQueryParams>(),

		// TAGS
		togglePopularTag			: props<{ id: UUID }>(),

		clickTag					: props<{ name: string }>(),
		setSelectedTags				: props<{ tags: string[] }>(),
		emptySelectedTags			: emptyProps(),
		search						: props<{ term: string }>(),

		// CLOUD SYNC
		uploadClicked				: emptyProps()

	}

});
