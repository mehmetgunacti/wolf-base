import { Bookmark, Click, OVERLAY_ID, RemoteMetadata, SyncData, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[Bookmark] Create', props<{ bookmark: Partial<Bookmark> }>());
export const createSuccess					= createAction('[Bookmark] Create Success', props<{ bookmark: Bookmark }>());

export const fromClipboard					= createAction('[Bookmark] From Clipboard');
export const fromClipboardFailure			= createAction('[Bookmark] From Clipboard Failure', props<{ shaking: boolean }>());

export const update							= createAction('[Bookmark] Update', props<{ id: UUID, bookmark: Partial<Bookmark> }>());
export const updateSuccess					= createAction('[Bookmark] Update Success', props<{ id: UUID }>());

export const moveToTrash					= createAction('[Bookmark] Move to Trash', props<{ id: UUID }>());
export const moveToTrashSuccess				= createAction('[Bookmark] Move to Trash Success', props<{ id: UUID }>());

// CLICK
export const click							= createAction('[Bookmark] Click', props<{ id: UUID }>());

// LOAD FROM LOCAL DATABASE INTO MEMORY
//// Entity
export const loadAll						= createAction('[Bookmark] Load All');
export const loadAllSuccess					= createAction('[Bookmark] Load All Success', props<{ bookmarks: Bookmark[], syncData: SyncData[], remoteMetadata: RemoteMetadata[], clicks: Click[] }>());

export const loadOne						= createAction('[Bookmark] Load One', props<{ id: UUID }>());
export const loadOneSuccess					= createAction('[Bookmark] Load One Success', props<{ id: UUID, bookmark: Bookmark | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null, click: Click | null }>());

export const unloadOne						= createAction('[Bookmark] Unload One', props<{ id: UUID }>());

//// Clicks
export const loadOneClick					= createAction('[Bookmark] Load One Click', props<{ id: UUID }>());
export const loadOneClickSuccess			= createAction('[Bookmark] Load One Click Success', props<{ id: UUID, click: Click | null }>());

export const loadAllClicks					= createAction('[Bookmark] Load All Clicks');
export const loadAllClicksSuccess			= createAction('[Bookmark] Load All Clicks Success', props<{ clicks: Click[] }>());

// SyncData
export const loadOneSyncData				= createAction('[Bookmark] Load One SyncData', props<{ id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[Bookmark] Load One SyncData Success', props<{ syncData: SyncData | null }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[Bookmark] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[Bookmark] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

//// Trash Count
// export const loadTrashCount					= createAction('[Bookmark] Load Trash Count');
// export const loadTrashCountSuccess			= createAction('[Bookmark] Load Trash Count Success', props<{ count: number }>());

// UI
export const openAddBookmarkDialog			= createAction('[Bookmark] Open Add Dialog');
export const openAddBookmarkDialogSuccess	= createAction('[Bookmark] Open Add Dialog Success', props<{ id: OVERLAY_ID }>());

export const openEditBookmarkDialog			= createAction('[Bookmark] Open Edit Dialog', props<{ id: UUID }>());
export const openEditBookmarkDialogSuccess	= createAction('[Bookmark] Open Edit Dialog Success', props<{ id: OVERLAY_ID }>());

export const closeEditBookmarkDialog		= createAction('[Bookmark] Close Edit Dialog');
export const closeEditBookmarkDialogSuccess	= createAction('[Bookmark] Close Edit Dialog Success');

export const setSelectedId					= createAction('[Bookmark] Set Selected Id', props<{ id: UUID | null }>());

export const setQueryParams					= createAction('[Bookmark] Set Query State', props<{ id: UUID | null, search: string | null, tags: string[] }>());



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
