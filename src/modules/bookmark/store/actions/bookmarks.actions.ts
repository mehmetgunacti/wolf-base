import { createAction, props } from '@ngrx/store';
import { Bookmark, UUID, ISyncState } from 'lib';

export const bookmarksFetchAll = createAction('[Bookmarks] fetch all');

export const bookmarksLoadAll = createAction('[Bookmarks] load all');
export const bookmarksLoadAllSuccess = createAction('[Bookmarks] load all success', props<{ bookmarks: Bookmark[] }>());

export const bookmarksRemoveAll = createAction('[Bookmarks] remove all');

export const bookmarksSearch = createAction('[Bookmarks] search', props<{ term: string }>());
export const bookmarksSearchSuccess = createAction('[Bookmarks] search success', props<{ bookmarks: Bookmark[] }>());

export const bookmarksCreate = createAction('[Bookmarks] Create Bookmark', props<{ bookmark: Partial<Bookmark> }>());
export const bookmarksCreateSuccess = createAction('[Bookmarks] Create Bookmark Success', props<{ bookmark: Bookmark }>());

export const bookmarksUpdate = createAction('[Bookmarks] Update Bookmark', props<{ id: UUID, bookmark: Partial<Bookmark> }>());
export const bookmarksUpdateSuccess = createAction('[Bookmarks] Update Bookmark Success', props<{ bookmark: Bookmark }>());

export const bookmarksDelete = createAction('[Bookmarks] delete', props<{ id: string }>());
export const bookmarksClick = createAction('[Bookmarks] clicked', props<{ payload: Bookmark }>());
export const bookmarksSetclicks = createAction('[Bookmarks] set click count', props<{ payload: Bookmark }>());

export const bookmarksSyncRequired = createAction('[Bookmarks] sync required', props<{ syncRequired: number }>());
export const bookmarksSyncReady = createAction('[Bookmarks] readying bookmarks');
export const bookmarksSyncToggleForceOverride = createAction('[Bookmarks] toggle force override bookmarks');
export const bookmarksSyncSetState = createAction('[Bookmarks] set sync state bookmarks', props<{ syncState: ISyncState }>());

// export const bookmarksToggleEditDialog = createAction('[Bookmarks] toggle edit dialog');
export const bookmarksAddOpenDialog = createAction('[Bookmarks] add: open dialog');
export const bookmarksEditOpenDialog = createAction('[Bookmarks] edit: open dialog', props<{ id: UUID }>());
export const bookmarksEditCloseDialog = createAction('[Bookmarks] edit: close dialog');