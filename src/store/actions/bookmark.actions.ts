import { UUID } from '@constants/common.constant';
import { BookmarkQueryParams, Click } from '@models/bookmark.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const bookmarkActions = createActionGroup({

	source: 'Bookmark',
	events: {

		fromClipboard				: emptyProps(),
		fromClipboardFailure		: props<{ shaking: boolean }>(),

		editSuccess					: emptyProps(),

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
		openEditDialog				: props<{ id: UUID }>(),
		closeFormDialog				: emptyProps(),
		toggleTagVisibility			: emptyProps(),

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
