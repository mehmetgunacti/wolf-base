import { Note, RemoteMetadata, SyncData, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[Note] Create', props<{ note: Partial<Note> }>());
export const createSuccess					= createAction('[Note] Create Success', props<{ note: Note }>());

export const fromClipboard					= createAction('[Note] From Clipboard');
export const fromClipboardFailure			= createAction('[Note] From Clipboard Failure', props<{ shaking: boolean }>());

export const update							= createAction('[Note] Update', props<{ id: UUID, note: Partial<Note> }>());
export const updateSuccess					= createAction('[Note] Update Success', props<{ id: UUID }>());

export const moveToTrash					= createAction('[Note] Move to Trash', props<{ id: UUID }>());
export const moveToTrashSuccess				= createAction('[Note] Move to Trash Success', props<{ id: UUID }>());

// CLICK
export const click							= createAction('[Note] Click', props<{ id: UUID }>());

// LOAD FROM LOCAL DATABASE INTO MEMORY
//// Entity
export const loadAll						= createAction('[Note] Load All');
export const loadAllSuccess					= createAction('[Note] Load All Success', props<{ notes: Note[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }>());

export const loadOne						= createAction('[Note] Load One', props<{ id: UUID }>());
export const loadOneSuccess					= createAction('[Note] Load One Success', props<{ id: UUID, note: Note | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const unloadOne						= createAction('[Note] Unload One', props<{ id: UUID }>());

// SyncData
export const loadOneSyncData				= createAction('[Note] Load One SyncData', props<{ id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[Note] Load One SyncData Success', props<{ syncData: SyncData | null }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[Note] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[Note] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

//// Trash Count
// export const loadTrashCount					= createAction('[Note] Load Trash Count');
// export const loadTrashCountSuccess			= createAction('[Note] Load Trash Count Success', props<{ count: number }>());

// UI
export const setSelectedId					= createAction('[Note] Set Selected Id', props<{ id: UUID | null }>());

// TAGS
export const togglePopular					= createAction('[Note] Toggle Popular', props<{ id: UUID }>());

export const clickTag						= createAction('[Note] Click Tag', props<{ name: string }>());
export const setSelectedTags				= createAction('[Note] Set Selected Tags', props<{ tags: string[] }>());
export const emptySelectedTags				= createAction('[Note] Empty Selected Tags');
export const search							= createAction('[Note] Search', props<{ term: string }>());

// CLOUD SYNC
// local_new
export const syncLocalNew					= createAction('[Note] Sync Local New');

// local_updated
export const syncLocalUpdated				= createAction('[Note] Sync Local Updated');

// local_deleted
export const syncLocalDeleted				= createAction('[Note] Sync Local Deleted');

// remote_new
export const syncRemoteNew					= createAction('[Note] Sync Remote New');

// remote_updated
export const syncRemoteUpdated				= createAction('[Note] Sync Remote Updated');

// remote_deleted
export const syncRemoteDeleted				= createAction('[Note] Sync Remote Deleted');

// deleted_deleted
export const syncDeletedDeleted				= createAction('[Note] Sync Deleted Deleted');

export const uploadClicked					= createAction('[Note] Upload Clicked');
