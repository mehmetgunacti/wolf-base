import { createAction, props } from '@ngrx/store';
import { Bookmark, Click, OVERLAY_ID, RemoteMetadata, SyncData, UUID } from '@lib';

export const loadOneBookmark				= createAction('[Bookmark] Load One', props<{ id: UUID }>());
export const loadOneBookmarkSuccess			= createAction('[Bookmark] Load One Success', props<{ bookmark: Bookmark }>());
export const loadOneBookmarkFailure			= createAction('[Bookmark] Load One Failure', props<{ id: UUID }>());

export const loadAllBookmarks				= createAction('[Bookmark] Load All');
export const loadAllBookmarksSuccess		= createAction('[Bookmark] Load All Success', props<{ bookmarks: Bookmark[] }>());

export const loadAllClicks					= createAction('[Bookmark] Load All Clicks');
export const loadAllClicksSuccess			= createAction('[Bookmark] Load All Clicks Success', props<{ clicks: Click[] }>());

export const fromClipboard					= createAction('[Bookmark] From Clipboard');
export const fromClipboardFailure			= createAction('[Bookmark] From Clipboard Failure', props<{ shaking: boolean }>());

export const clickBookmark					= createAction('[Bookmark] Click', props<{ id: UUID }>());

export const loadAllSyncData				= createAction('[Bookmark] Load All SyncData');
export const loadAllSyncDataSuccess			= createAction('[Bookmark] Load All SyncData Success', props<{ syncData: SyncData[] }>());

export const loadAllRemoteMetadata			= createAction('[Bookmark] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[Bookmark] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

export const loadTrashCount					= createAction('[Bookmark] Load Trash Count');
export const loadTrashCountSuccess			= createAction('[Bookmark] Load Trash Count Success', props<{ count: number }>());

export const openAddBookmarkDialog			= createAction('[Bookmark] Open Add Dialog');
export const openAddBookmarkDialogSuccess	= createAction('[Bookmark] Open Add Dialog Success', props<{ id: OVERLAY_ID }>());

export const openEditBookmarkDialog			= createAction('[Bookmark] Open Edit Dialog', props<{ id: UUID }>());
export const openEditBookmarkDialogSuccess	= createAction('[Bookmark] Open Edit Dialog Success', props<{ id: OVERLAY_ID }>());

export const closeEditBookmarkDialog		= createAction('[Bookmark] Close Edit Dialog');
export const closeEditBookmarkDialogSuccess	= createAction('[Bookmark] Close Edit Dialog Success');

export const togglePopular					= createAction('[Bookmark] Toggle Popular', props<{ id: UUID }>());

export const clickTag						= createAction('[Bookmark] Click Tag', props<{ name: string }>());
export const setSelectedTags				= createAction('[Bookmark] Set Selected Tags', props<{ tags: string[] }>());
export const emptySelectedTags				= createAction('[Bookmark] Empty Selected Tags');
export const search							= createAction('[Bookmark] Search', props<{ term: string }>());
