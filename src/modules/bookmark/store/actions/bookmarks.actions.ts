import { createAction, props } from '@ngrx/store';
import { Bookmark, UUID } from 'lib';

export const loadAllBookmarksSuccess = createAction('[Bookmarks] Load All Success', props<{ bookmarks: Bookmark[] }>());

export const searchBookmarks = createAction('[Bookmarks] Search Bookmarks', props<{ term: string }>());
export const searchBookmarksSuccess = createAction('[Bookmarks] Search Bookmarks Success', props<{ bookmarks: Bookmark[] }>());

export const createBookmark = createAction('[Bookmarks] Create Bookmark', props<{ bookmark: Partial<Bookmark> }>());
export const createBookmarkSuccess = createAction('[Bookmarks] Create Bookmark Success', props<{ bookmark: Bookmark }>());

export const updateBookmark = createAction('[Bookmarks] Update Bookmark', props<{ id: UUID, bookmark: Partial<Bookmark> }>());
export const updateBookmarkSuccess = createAction('[Bookmarks] Update Bookmark Success', props<{ bookmark: Bookmark }>());

export const deleteBookmark = createAction('[Bookmarks] Delete Bookmark', props<{ id: string }>());
export const deleteBookmarkSuccess = createAction('[Bookmarks] Delete Bookmark Success', props<{ bookmark: Bookmark }>());

export const clickBookmark = createAction('[Bookmarks] Click Bookmark', props<{ payload: Bookmark }>());

export const openAddBookmarkDialog = createAction('[Bookmarks] Open Add Bookmark Dialog');
export const openEditBookmarkDialog = createAction('[Bookmarks] Open Edit Bookmark Dialog', props<{ id: UUID }>());
export const closeEditBookmarkDialog = createAction('[Bookmarks] Close Edit Bookmark Dialog');