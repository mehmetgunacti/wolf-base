import { createAction, props } from '@ngrx/store';
import { Bookmark, ISyncState } from 'lib';

export const bookmarksFetchAll = createAction('[Bookmarks] fetch all');

export const bookmarksLoadAll = createAction('[Bookmarks] load all');
export const bookmarksLoadAllSuccess = createAction('[Bookmarks] load all success', props<{ bookmarks: Bookmark[] }>());

export const bookmarksRemoveAll = createAction('[Bookmarks] remove all');

export const bookmarksSearch = createAction('[Bookmarks] search', props<{ term: string }>());
export const bookmarksSearchSuccess = createAction('[Bookmarks] search success', props<{ bookmarks: Bookmark[] }>());

export const bookmarksUpsert = createAction('[Bookmarks] create or update', props<{ payload: Bookmark }>());

export const bookmarksDelete = createAction('[Bookmarks] delete', props<{ id: string }>());
export const bookmarksClick = createAction('[Bookmarks] clicked', props<{ payload: Bookmark }>());
export const bookmarksSetclicks = createAction('[Bookmarks] set click count', props<{ payload: Bookmark }>());

export const bookmarksSyncRequired = createAction('[Bookmarks] sync required', props<{ syncRequired: number }>());
export const bookmarksSyncReady = createAction('[Bookmarks] readying bookmarks');
export const bookmarksSyncToggleForceOverride = createAction('[Bookmarks] toggle force override bookmarks');
export const bookmarksSyncSetState = createAction('[Bookmarks] set sync state bookmarks', props<{ syncState: ISyncState }>());

export const bookmarksToggleEditDialog = createAction('[Bookmarks] toggle edit dialog');