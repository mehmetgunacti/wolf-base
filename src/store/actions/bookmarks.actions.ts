import { createAction, props } from '@ngrx/store';
import { Bookmark, Click, SyncData, Tag, UUID } from 'lib';

export class BookmarkActions {

	static loadAllBookmarksSuccess = createAction('[Bookmark] Load All Success', props<{ bookmarks: Bookmark[] }>());
	static createBookmark = createAction('[Bookmark] Create Bookmark', props<{ bookmark: Partial<Bookmark> }>());
	static createBookmarkSuccess = createAction('[Bookmark] Create Bookmark Success', props<{ bookmark: Bookmark }>());
	static updateBookmark = createAction('[Bookmark] Update Bookmark', props<{ id: UUID, bookmark: Partial<Bookmark> }>());
	static updateBookmarkSuccess = createAction('[Bookmark] Update Bookmark Success', props<{ bookmark: Bookmark }>());
	static updateBookmarkFailure = createAction('[Bookmark] Update Bookmark Failure', props<{ id: UUID }>());
	static deleteBookmark = createAction('[Bookmark] Delete Bookmark', props<{ id: UUID }>());
	static deleteBookmarkSuccess = createAction('[Bookmark] Delete Bookmark Success', props<{ bookmark: Bookmark }>());
	static clickBookmark = createAction('[Bookmark] Click Bookmark', props<{ id: UUID }>());
	static clicksSuccess = createAction('[Bookmark] Bookmarks Clicks Success', props<{ clicks: Click[] }>());

	static Sync = class {

		static syncSuccess = createAction('[Bookmark Sync] SyncData Load Success', props<{ syncData: SyncData[] }>());
		static trashCountSuccess = createAction('[Bookmark Sync] Trash Count Success', props<{ count: number }>());

	}

	static Tags = class {

		static loadAllTagsSuccess = createAction('[Bookmark Tags] Load All Tags Success', props<{ tags: Tag[] }>());
		static clickTag = createAction('[Bookmark Tags] Click Tag', props<{ name: string }>());
		static setSelectedTags = createAction('[Bookmark Tags] Set Selected Tags', props<{ tags: string[] }>());
		static emptySelectedTags = createAction('[Bookmark Tags] Empty Selected Tags');
		static search = createAction('[Bookmark Tags] Search', props<{ term: string }>());

	}

	static UI = class {

		static toggleSearchAndTagCloudVisibility = createAction('[Bookmark UI] Toggle Search Tag Cloud Visibility');
		static openAddBookmarkDialog = createAction('[Bookmark UI] Open Add Bookmark Dialog');
		static openEditBookmarkDialog = createAction('[Bookmark UI] Open Edit Bookmark Dialog', props<{ id: UUID }>());
		static closeEditBookmarkDialog = createAction('[Bookmark UI] Close Edit Bookmark Dialog');
		static togglePopular = createAction('[Bookmark UI] Toggle Popular', props<{ id: UUID }>());

	}

}