import { RemoteMetadata, SyncData, UUID, Word } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[Word] Create', props<{ word: Partial<Word> }>());
export const createSuccess					= createAction('[Word] Create Success', props<{ word: Word }>());

export const fromClipboard					= createAction('[Word] From Clipboard');
export const fromClipboardFailure			= createAction('[Word] From Clipboard Failure', props<{ shaking: boolean }>());

export const update							= createAction('[Word] Update', props<{ id: UUID, word: Partial<Word> }>());
export const updateSuccess					= createAction('[Word] Update Success', props<{ id: UUID }>());

export const moveToTrash					= createAction('[Word] Move to Trash', props<{ id: UUID }>());
export const moveToTrashSuccess				= createAction('[Word] Move to Trash Success', props<{ id: UUID }>());

// LOAD FROM LOCAL DATABASE INTO MEMORY
//// Entity
export const loadAll						= createAction('[Word] Load All');
export const loadAllSuccess					= createAction('[Word] Load All Success', props<{ words: Word[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }>());

export const loadOne						= createAction('[Word] Load One', props<{ id: UUID }>());
export const loadOneSuccess					= createAction('[Word] Load One Success', props<{ id: UUID, word: Word | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const unloadOne						= createAction('[Word] Unload One', props<{ id: UUID }>());

// SyncData
export const loadOneSyncData				= createAction('[Word] Load One SyncData', props<{ id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[Word] Load One SyncData Success', props<{ syncData: SyncData | null }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[Word] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[Word] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

//// Trash Count
// export const loadTrashCount					= createAction('[Word] Load Trash Count');
// export const loadTrashCountSuccess			= createAction('[Word] Load Trash Count Success', props<{ count: number }>());

// UI
export const setEditId						= createAction('[Word] Set Edit Id', props<{ id: UUID | null }>());
export const setSelectedId					= createAction('[Word] Set Selected Id', props<{ id: UUID | null }>());

// CLOUD SYNC
// local_new
export const syncLocalNew					= createAction('[Word] Sync Local New');

// local_updated
export const syncLocalUpdated				= createAction('[Word] Sync Local Updated');

// local_deleted
export const syncLocalDeleted				= createAction('[Word] Sync Local Deleted');

// remote_new
export const syncRemoteNew					= createAction('[Word] Sync Remote New');

// remote_updated
export const syncRemoteUpdated				= createAction('[Word] Sync Remote Updated');

// remote_deleted
export const syncRemoteDeleted				= createAction('[Word] Sync Remote Deleted');

// deleted_deleted
export const syncDeletedDeleted				= createAction('[Word] Sync Deleted Deleted');
