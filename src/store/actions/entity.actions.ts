import { Entity, AppEntityType, RemoteMetadata, SyncData, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[Entity] Create', props<{ entityType: AppEntityType, entity: Partial<Entity> }>());
export const createSuccess					= createAction('[Entity] Create Success', props<{ entityType: AppEntityType, entity: Entity }>());

export const update							= createAction('[Entity] Update', props<{ entityType: AppEntityType, id: UUID, entity: Partial<any> }>());
export const updateSuccess					= createAction('[Entity] Update Success', props<{ entityType: AppEntityType, id: UUID }>());

export const moveToTrash					= createAction('[Entity] Move to Trash', props<{ entityType: AppEntityType, id: UUID }>());
export const moveToTrashSuccess				= createAction('[Entity] Move to Trash Success', props<{ entityType: AppEntityType, id: UUID }>());

// selectedId
export const setSelectedId					= createAction('[Entity] Set Selected Id', props<{ entityType: AppEntityType, id: UUID | null }>());

// LOAD (IndexedDb -> NgRx Store)
// Entity
export const loadAll						= createAction('[Entity] Load All', props<{ filter: { entityType: AppEntityType, loadEntities: boolean, loadSyncData: boolean, loadRemoteMetadata: boolean }[] }>());
export const loadAllSuccess					= createAction('[Entity] Load All Success', props<{ data: { entityType: AppEntityType, entities: Entity[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }[] }>());

export const loadOne						= createAction('[Entity] Load One', props<{ entityType: AppEntityType, id: UUID }>());
export const loadOneSuccess					= createAction('[Entity] Load One Success', props<{ entityType: AppEntityType, id: UUID, entity: Entity | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const unloadOne						= createAction('[Entity] Unload One', props<{ entityType: AppEntityType, id: UUID }>());

// SyncData
export const loadOneSyncData				= createAction('[Entity] Load One SyncData', props<{ entityType: AppEntityType, id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[Entity] Load One SyncData Success', props<{ entityType: AppEntityType, syncData: SyncData | null }>());

//// RemoteMetadata
// export const loadAllRemoteMetadataSuccess	= createAction('[Entity] Load All RemoteMetadata Success', props<{ entityType: AppEntityType, remoteMetadata: RemoteMetadata[] }>());
export const downloadRemoteMetadata			= createAction('[Entity] Download Remote Metadata');
export const downloadRemoteMetadataSuccess	= createAction('[Entity] Download Remote Metadata Success', props<{ data: Record<AppEntityType, RemoteMetadata[]> }>());

// CLOUD SYNC
// local_new
export const syncLocalNew					= createAction('[Entity] Sync Local New', props<{ entityType: AppEntityType }>());

// local_updated
export const syncLocalUpdated				= createAction('[Entity] Sync Local Updated', props<{ entityType: AppEntityType }>());

// local_deleted
export const syncLocalDeleted				= createAction('[Entity] Sync Local Deleted', props<{ entityType: AppEntityType }>());

// remote_new
export const syncRemoteNew					= createAction('[Entity] Sync Remote New', props<{ entityType: AppEntityType }>());

// remote_updated
export const syncRemoteUpdated				= createAction('[Entity] Sync Remote Updated', props<{ entityType: AppEntityType }>());

// remote_deleted
export const syncRemoteDeleted				= createAction('[Entity] Sync Remote Deleted', props<{ entityType: AppEntityType }>());

// deleted_deleted
export const syncDeletedDeleted				= createAction('[Entity] Sync Deleted Deleted', props<{ entityType: AppEntityType }>());
