import { NoteContent, RemoteMetadata, SyncData, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[Note Content] Create', props<{ content: NoteContent }>());
export const createSuccess					= createAction('[Note Content] Create Success', props<{ content: NoteContent }>());

export const fromClipboard					= createAction('[Note Content] From Clipboard');
export const fromClipboardFailure			= createAction('[Note Content] From Clipboard Failure', props<{ shaking: boolean }>());

export const update							= createAction('[Note Content] Update', props<{ id: UUID, content: Partial<NoteContent> }>());
export const updateSuccess					= createAction('[Note Content] Update Success', props<{ id: UUID }>());

export const moveToTrash					= createAction('[Note Content] Move to Trash', props<{ id: UUID }>());
export const moveToTrashSuccess				= createAction('[Note Content] Move to Trash Success', props<{ id: UUID }>());

// LOAD FROM LOCAL DATABASE INTO MEMORY
//// Entity
export const loadAll						= createAction('[Note Content] Load All');
export const loadAllSuccess					= createAction('[Note Content] Load All Success', props<{ ids: UUID[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }>());

export const loadOne						= createAction('[Note Content] Load One', props<{ id: UUID }>());
export const loadOneSuccess					= createAction('[Note Content] Load One Success', props<{ id: UUID, contentAvailable: boolean, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const unloadOne						= createAction('[Note Content] Unload One', props<{ id: UUID }>());

export const loadOneContentSuccess			= createAction('[Note Content] Load One Content Success', props<{ content: NoteContent | null }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[Note Content] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[Note Content] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

// CLOUD SYNC
// local_new
export const syncLocalNew					= createAction('[Note Content] Sync Local New');

// local_updated
export const syncLocalUpdated				= createAction('[Note Content] Sync Local Updated');

// local_deleted
export const syncLocalDeleted				= createAction('[Note Content] Sync Local Deleted');

// remote_new
export const syncRemoteNew					= createAction('[Note Content] Sync Remote New');

// remote_updated
export const syncRemoteUpdated				= createAction('[Note Content] Sync Remote Updated');

// remote_deleted
export const syncRemoteDeleted				= createAction('[Note Content] Sync Remote Deleted');

// deleted_deleted
export const syncDeletedDeleted				= createAction('[Note Content] Sync Deleted Deleted');
