import { RemoteMetadata, SyncData, UUID, Quote } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[Quote] Create', props<{ quote: Partial<Quote> }>());
export const createSuccess					= createAction('[Quote] Create Success', props<{ quote: Quote }>());

export const update							= createAction('[Quote] Update', props<{ id: UUID, quote: Partial<Quote> }>());
export const updateSuccess					= createAction('[Quote] Update Success', props<{ id: UUID }>());

export const moveToTrash					= createAction('[Quote] Move to Trash', props<{ id: UUID }>());
export const moveToTrashSuccess				= createAction('[Quote] Move to Trash Success', props<{ id: UUID }>());

// LOAD FROM LOCAL DATABASE INTO MEMORY
//// Entity
export const loadAll						= createAction('[Quote] Load All');
export const loadAllSuccess					= createAction('[Quote] Load All Success', props<{ quotes: Quote[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }>());

export const loadOne						= createAction('[Quote] Load One', props<{ id: UUID }>());
export const loadOneSuccess					= createAction('[Quote] Load One Success', props<{ id: UUID, quote: Quote | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const unloadOne						= createAction('[Quote] Unload One', props<{ id: UUID }>());

// SyncData
export const loadOneSyncData				= createAction('[Quote] Load One SyncData', props<{ id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[Quote] Load One SyncData Success', props<{ syncData: SyncData | null }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[Quote] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[Quote] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

//// Trash Count
// export const loadTrashCount					= createAction('[Quote] Load Trash Count');
// export const loadTrashCountSuccess			= createAction('[Quote] Load Trash Count Success', props<{ count: number }>());

// UI
export const setSelectedId					= createAction('[Quote] Set Selected Id', props<{ id: UUID | null }>());

// CLOUD SYNC
// local_new
export const syncLocalNew					= createAction('[Quote] Sync Local New');

// local_updated
export const syncLocalUpdated				= createAction('[Quote] Sync Local Updated');

// local_deleted
export const syncLocalDeleted				= createAction('[Quote] Sync Local Deleted');

// remote_new
export const syncRemoteNew					= createAction('[Quote] Sync Remote New');

// remote_updated
export const syncRemoteUpdated				= createAction('[Quote] Sync Remote Updated');

// remote_deleted
export const syncRemoteDeleted				= createAction('[Quote] Sync Remote Deleted');

// deleted_deleted
export const syncDeletedDeleted				= createAction('[Quote] Sync Deleted Deleted');
