import { createAction, props } from '@ngrx/store';
import { Bookmark, Click, UUID } from 'lib';

export const loadAllBookmarksSuccess = createAction('[Bookmark] Load All Success', props<{ bookmarks: Bookmark[] }>());
export const createBookmark = createAction('[Bookmark] Create Bookmark', props<{ bookmark: Partial<Bookmark> }>());
export const createBookmarkSuccess = createAction('[Bookmark] Create Bookmark Success', props<{ bookmark: Bookmark }>());
export const updateBookmark = createAction('[Bookmark] Update Bookmark', props<{ id: UUID, bookmark: Partial<Bookmark> }>());
export const updateBookmarkSuccess = createAction('[Bookmark] Update Bookmark Success', props<{ bookmark: Bookmark }>());
export const updateBookmarkFailure = createAction('[Bookmark] Update Bookmark Failure', props<{ id: UUID }>());
export const deleteBookmark = createAction('[Bookmark] Delete Bookmark', props<{ id: UUID }>());
export const deleteBookmarkSuccess = createAction('[Bookmark] Delete Bookmark Success', props<{ bookmark: Bookmark }>());
export const clickBookmark = createAction('[Bookmark] Click Bookmark', props<{ id: UUID }>());
export const clicksSuccess = createAction('[Bookmark] Bookmarks Clicks Success', props<{ clicks: Click[] }>());