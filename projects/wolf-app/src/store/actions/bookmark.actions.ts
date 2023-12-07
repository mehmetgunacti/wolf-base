import { Bookmark, Click, Entity, NameBase, OVERLAY_ID, RemoteData, RemoteMetadata, SyncData, UUID } from '@lib';
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
export const clickBookmark					= createAction('[Bookmark] Click', props<{ id: UUID }>());

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
// export const loadAllClicks					= createAction('[Bookmark] Load All Clicks');
// export const loadAllClicksSuccess			= createAction('[Bookmark] Load All Clicks Success', props<{ clicks: Click[] }>());

//// SyncData
// export const loadAllSyncData				= createAction('[Bookmark] Load All SyncData');
// export const loadAllSyncDataSuccess			= createAction('[Bookmark] Load All SyncData Success', props<{ syncData: SyncData[] }>());

export const loadOneSyncData				= createAction('[Bookmark] Load One SyncData', props<{ id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[Bookmark] Load One SyncData Success', props<{ syncData: SyncData | null }>());
// export const loadOneSyncDataFailure			= createAction('[Bookmark] Load One SyncData Failure', props<{ id: UUID }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[Bookmark] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[Bookmark] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

// export const loadOneRemoteMetadata			= createAction('[Bookmark] Load One RemoteMetadata', props<{ id: UUID }>());
// export const loadOneRemoteMetadataSuccess	= createAction('[Bookmark] Load One RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata }>());
// export const loadOneRemoteMetadataFailure	= createAction('[Bookmark] Load One RemoteMetadata Failure', props<{ id: UUID }>());

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

// TAGS
export const togglePopular					= createAction('[Bookmark] Toggle Popular', props<{ id: UUID }>());

export const clickTag						= createAction('[Bookmark] Click Tag', props<{ name: string }>());
export const setSelectedTags				= createAction('[Bookmark] Set Selected Tags', props<{ tags: string[] }>());
export const emptySelectedTags				= createAction('[Bookmark] Empty Selected Tags');
export const search							= createAction('[Bookmark] Search', props<{ term: string }>());

// CLOUD SYNC
export const syncLocalNew					= createAction('[Bookmark] Sync Local New');
// export const syncLocalNewSuccess			= createAction('[Bookmark] Sync Local New Success', props<{ id: UUID, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const syncLocalUpdated				= createAction('[Bookmark] Sync Local Updated');
// export const syncLocalUpdatedSuccess		= createAction('[Bookmark] Sync Local Updated Success', props<{ id: UUID, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const syncLocalDeleted				= createAction('[Bookmark] Sync Local Deleted');
// export const syncLocalDeletedSuccess		= createAction('[Bookmark] Sync Local Deleted Success', props<{ item: NameBase }>());

export const syncRemoteNew					= createAction('[Bookmark] Sync Remote New');
// export const syncRemoteNewSuccess			= createAction('[Bookmark] Sync Remote New Success', props<{ id: UUID, bookmark: Bookmark | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const syncRemoteUpdated				= createAction('[Bookmark] Sync Remote Updated');
// export const syncRemoteUpdatedSuccess		= createAction('[Bookmark] Sync Remote Updated Success', props<{ id: UUID, bookmark: Bookmark | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const syncRemoteDeleted				= createAction('[Bookmark] Sync Remote Deleted');
// export const syncRemoteDeletedSuccess		= createAction('[Bookmark] Sync Remote Deleted Success', props<{ item: NameBase }>());

export const syncDeletedDeleted				= createAction('[Bookmark] Sync Deleted Deleted');
// export const syncDeletedDeletedSuccess		= createAction('[Bookmark] Sync Deleted Deleted Success', props<{ item: NameBase }>());

export const syncClicked					= createAction('[Bookmark] Sync Clicked');
