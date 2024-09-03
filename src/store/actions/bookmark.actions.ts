import { BookmarkQueryParams, Click, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

export const fromClipboard					= createAction('[Bookmark] From Clipboard');
export const fromClipboardFailure			= createAction('[Bookmark] From Clipboard Failure', props<{ shaking: boolean }>());

// CLICK
export const click							= createAction('[Bookmark] Click', props<{ id: UUID }>());

// LOAD FROM LOCAL DATABASE INTO MEMORY
//// Clicks
export const loadOneClick					= createAction('[Bookmark] Load One Click', props<{ id: UUID }>());
export const loadOneClickSuccess			= createAction('[Bookmark] Load One Click Success', props<{ id: UUID, click: Click | null }>());

export const loadAllClicks					= createAction('[Bookmark] Load All Clicks');
export const loadAllClicksSuccess			= createAction('[Bookmark] Load All Clicks Success', props<{ clicks: Click[] }>());

// UI
export const openAddBookmarkDialog			= createAction('[Bookmark] Open Add Dialog');
export const openEditBookmarkDialog			= createAction('[Bookmark] Open Edit Dialog', props<{ id: UUID }>());
export const closeEditBookmarkDialog		= createAction('[Bookmark] Close Edit Dialog');

export const setSelectedId					= createAction('[Bookmark] Set Selected Id', props<{ id: UUID | null }>());
export const setQueryParams					= createAction('[Bookmark] Set Query State', props<BookmarkQueryParams>());

// TAGS
export const togglePopular					= createAction('[Bookmark] Toggle Tag Popular', props<{ id: UUID }>());

export const clickTag						= createAction('[Bookmark] Click Tag', props<{ name: string }>());
export const setSelectedTags				= createAction('[Bookmark] Set Selected Tags', props<{ tags: string[] }>());
export const emptySelectedTags				= createAction('[Bookmark] Empty Selected Tags');
export const search							= createAction('[Bookmark] Search', props<{ term: string }>());

// CLOUD SYNC
export const uploadClicked					= createAction('[Bookmark] Upload Clicked');
