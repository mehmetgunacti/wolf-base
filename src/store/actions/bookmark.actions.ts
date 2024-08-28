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
// local_new
export const syncLocalNew					= createAction('[Bookmark] Sync Local New');

// local_updated
export const syncLocalUpdated				= createAction('[Bookmark] Sync Local Updated');

// local_deleted
export const syncLocalDeleted				= createAction('[Bookmark] Sync Local Deleted');

// remote_new
export const syncRemoteNew					= createAction('[Bookmark] Sync Remote New');

// remote_updated
export const syncRemoteUpdated				= createAction('[Bookmark] Sync Remote Updated');

// remote_deleted
export const syncRemoteDeleted				= createAction('[Bookmark] Sync Remote Deleted');

// deleted_deleted
export const syncDeletedDeleted				= createAction('[Bookmark] Sync Deleted Deleted');

export const uploadClicked					= createAction('[Bookmark] Upload Clicked');
