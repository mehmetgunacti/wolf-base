import { createAction, props } from '@ngrx/store';
import { Bookmark, Click, SyncData, Tag, UUID } from 'lib';

export class BookmarkActions {

	static loadAllBookmarksSuccess = createAction('[Bookmarks] Load All Success', props<{ bookmarks: Bookmark[] }>());
	static createBookmark = createAction('[Bookmarks] Create Bookmark', props<{ bookmark: Partial<Bookmark> }>());
	static createBookmarkSuccess = createAction('[Bookmarks] Create Bookmark Success', props<{ bookmark: Bookmark }>());
	static updateBookmark = createAction('[Bookmarks] Update Bookmark', props<{ id: UUID, bookmark: Partial<Bookmark> }>());
	static updateBookmarkSuccess = createAction('[Bookmarks] Update Bookmark Success', props<{ bookmark: Bookmark }>());
	static updateBookmarkFailure = createAction('[Bookmarks] Update Bookmark Failure', props<{ id: UUID }>());
	static deleteBookmark = createAction('[Bookmarks] Delete Bookmark', props<{ id: UUID }>());
	static deleteBookmarkSuccess = createAction('[Bookmarks] Delete Bookmark Success', props<{ bookmark: Bookmark }>());
	static clickBookmark = createAction('[Bookmarks] Click Bookmark', props<{ id: UUID }>());
	static togglePopular = createAction('[Bookmarks] Toggle Popular', props<{ id: UUID }>());
	static bookmarksClicksSuccess = createAction('[Bookmarks] Bookmarks Clicks Success', props<{ clicks: Click[] }>());

	static Sync = class {

		static syncSuccess = createAction('[Bookmarks] SyncData Load Success', props<{ syncData: SyncData[] }>());
		static trashCountSuccess = createAction('[Bookmarks] Trash Count Success', props<{ count: number }>());

	}

	static Tags = class {

		static loadAllTagsSuccess = createAction('[Bookmark Tags] Load All Tags Success', props<{ tags: Tag[] }>());
		static clickTag = createAction('[Bookmark Tags] Click Tag', props<{ name: string }>());
		static setSelectedTags = createAction('[Bookmark Tags] Set Selected Tags', props<{ tags: string[] }>());
		static emptySelectedTags = createAction('[Bookmark Tags] Empty Selected Tags');
		static search = createAction('[Bookmark Tags] Search', props<{ term: string }>());

	}

	static UI = class {

		static toggleSearchAndTagCloudVisibility = createAction('[Tags] Toggle Search Tag Cloud Visibility');
		static openAddBookmarkDialog = createAction('[Bookmarks] Open Add Bookmark Dialog');
		static openEditBookmarkDialog = createAction('[Bookmarks] Open Edit Bookmark Dialog', props<{ id: UUID }>());
		static closeEditBookmarkDialog = createAction('[Bookmarks] Close Edit Bookmark Dialog');

	}

}