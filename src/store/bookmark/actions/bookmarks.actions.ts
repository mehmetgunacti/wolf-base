import { createAction, props } from '@ngrx/store';
import { Bookmark, Click, UUID } from 'lib';

export const loadAllBookmarksSuccess = createAction('[Bookmarks] Load All Success', props<{ bookmarks: Bookmark[] }>());

export const createBookmark = createAction('[Bookmarks] Create Bookmark', props<{ bookmark: Partial<Bookmark> }>());
export const createBookmarkSuccess = createAction('[Bookmarks] Create Bookmark Success', props<{ bookmark: Bookmark }>());

export const updateBookmark = createAction('[Bookmarks] Update Bookmark', props<{ id: UUID, bookmark: Partial<Bookmark> }>());
export const updateBookmarkSuccess = createAction('[Bookmarks] Update Bookmark Success', props<{ bookmark: Bookmark }>());
export const updateBookmarkFailure = createAction('[Bookmarks] Update Bookmark Failure', props<{ id: UUID }>());

export const deleteBookmark = createAction('[Bookmarks] Delete Bookmark', props<{ id: UUID }>());
export const deleteBookmarkSuccess = createAction('[Bookmarks] Delete Bookmark Success', props<{ bookmark: Bookmark }>());

export const clickBookmark = createAction('[Bookmarks] Click Bookmark', props<{ id: UUID }>());

export const togglePopular = createAction('[Bookmarks] Toggle Popular', props<{ id: UUID }>());

export const bookmarksClicksSuccess = createAction('[Bookmarks] Bookmarks Clicks Success', props<{ clicks: Click[] }>());