import { RemoteMetadata, SyncData, Task, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[Task] Create', props<{ task: Partial<Task> }>());
export const createSuccess					= createAction('[Task] Create Success', props<{ task: Task }>());

export const fromClipboard					= createAction('[Task] From Clipboard');
export const fromClipboardFailure			= createAction('[Task] From Clipboard Failure', props<{ shaking: boolean }>());

export const update							= createAction('[Task] Update', props<{ id: UUID, task: Partial<Task> }>());
export const updateSuccess					= createAction('[Task] Update Success', props<{ id: UUID }>());

export const moveToTrash					= createAction('[Task] Move to Trash', props<{ id: UUID }>());
export const moveToTrashSuccess				= createAction('[Task] Move to Trash Success', props<{ id: UUID }>());

// LOAD FROM LOCAL DATABASE INTO MEMORY
//// Entity
export const loadAll						= createAction('[Task] Load All');
export const loadAllSuccess					= createAction('[Task] Load All Success', props<{ tasks: Task[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }>());

export const loadOne						= createAction('[Task] Load One', props<{ id: UUID }>());
export const loadOneSuccess					= createAction('[Task] Load One Success', props<{ id: UUID, task: Task | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const unloadOne						= createAction('[Task] Unload One', props<{ id: UUID }>());

// SyncData
export const loadOneSyncData				= createAction('[Task] Load One SyncData', props<{ id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[Task] Load One SyncData Success', props<{ syncData: SyncData | null }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[Task] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[Task] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

//// Trash Count
// export const loadTrashCount					= createAction('[Task] Load Trash Count');
// export const loadTrashCountSuccess			= createAction('[Task] Load Trash Count Success', props<{ count: number }>());

// UI
export const setSelectedId					= createAction('[Task] Set Selected Id', props<{ id: UUID | null }>());
export const openAddTaskDialog				= createAction('[Task] Open New Task Dialog', props<{ taskGroupId: UUID }>());
export const openEditTaskDialog				= createAction('[Task] Open Edit Dialog', props<{ id: UUID }>());
export const closeEditTaskDialog			= createAction('[Task] Close Edit Dialog');

// CLOUD SYNC
// local_new
export const syncLocalNew					= createAction('[Task] Sync Local New');

// local_updated
export const syncLocalUpdated				= createAction('[Task] Sync Local Updated');

// local_deleted
export const syncLocalDeleted				= createAction('[Task] Sync Local Deleted');

// remote_new
export const syncRemoteNew					= createAction('[Task] Sync Remote New');

// remote_updated
export const syncRemoteUpdated				= createAction('[Task] Sync Remote Updated');

// remote_deleted
export const syncRemoteDeleted				= createAction('[Task] Sync Remote Deleted');

// deleted_deleted
export const syncDeletedDeleted				= createAction('[Task] Sync Deleted Deleted');
