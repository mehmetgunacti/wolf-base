import { RemoteMetadata, SyncData, UUID, Project, ProjectQueryParams } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[Project] Create', props<{ project: Partial<Project> }>());
export const createSuccess					= createAction('[Project] Create Success', props<{ project: Project }>());

export const fromClipboard					= createAction('[Project] From Clipboard');
export const fromClipboardFailure			= createAction('[Project] From Clipboard Failure', props<{ shaking: boolean }>());

export const update							= createAction('[Project] Update', props<{ id: UUID, project: Partial<Project> }>());
export const updateSuccess					= createAction('[Project] Update Success', props<{ id: UUID }>());

export const moveToTrash					= createAction('[Project] Move to Trash', props<{ id: UUID }>());
export const moveToTrashSuccess				= createAction('[Project] Move to Trash Success', props<{ id: UUID }>());

// LOAD FROM LOCAL DATABASE INTO MEMORY
//// Entity
export const loadAll						= createAction('[Project] Load All');
export const loadAllSuccess					= createAction('[Project] Load All Success', props<{ projects: Project[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }>());

export const loadOne						= createAction('[Project] Load One', props<{ id: UUID }>());
export const loadOneSuccess					= createAction('[Project] Load One Success', props<{ id: UUID, project: Project | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const unloadOne						= createAction('[Project] Unload One', props<{ id: UUID }>());

// SyncData
export const loadOneSyncData				= createAction('[Project] Load One SyncData', props<{ id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[Project] Load One SyncData Success', props<{ syncData: SyncData | null }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[Project] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[Project] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

//// Trash Count
// export const loadTrashCount					= createAction('[Project] Load Trash Count');
// export const loadTrashCountSuccess			= createAction('[Project] Load Trash Count Success', props<{ count: number }>());

// UI
export const search							= createAction('[Project] Search', props<{ term: string | null }>());
export const setSelectedId					= createAction('[Project] Set Selected Id', props<{ id: UUID | null }>());
export const setQueryParams					= createAction('[Project] Set Query State', props<ProjectQueryParams>());
export const toggleInfo						= createAction('[Project] Toggle Info Panel');
export const openNewTaskDialog				= createAction('[Project] Open New Task Dialog');

// CLOUD SYNC
// local_new
export const syncLocalNew					= createAction('[Project] Sync Local New');

// local_updated
export const syncLocalUpdated				= createAction('[Project] Sync Local Updated');

// local_deleted
export const syncLocalDeleted				= createAction('[Project] Sync Local Deleted');

// remote_new
export const syncRemoteNew					= createAction('[Project] Sync Remote New');

// remote_updated
export const syncRemoteUpdated				= createAction('[Project] Sync Remote Updated');

// remote_deleted
export const syncRemoteDeleted				= createAction('[Project] Sync Remote Deleted');

// deleted_deleted
export const syncDeletedDeleted				= createAction('[Project] Sync Deleted Deleted');
