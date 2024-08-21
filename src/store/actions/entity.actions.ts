import { Entity, EntityType, RemoteMetadata, SyncData, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[Entity] Create', props<{ entityType: EntityType, entity: Partial<Entity> }>());
export const createSuccess					= createAction('[Entity] Create Success', props<{ entityType: EntityType, entity: Entity }>());

export const update							= createAction('[Entity] Update', props<{ id: UUID, entity: Partial<Entity> }>());
export const updateSuccess					= createAction('[Entity] Update Success', props<{ id: UUID }>());

export const moveToTrash					= createAction('[Entity] Move to Trash', props<{ id: UUID }>());
export const moveToTrashSuccess				= createAction('[Entity] Move to Trash Success', props<{ id: UUID }>());

// LOAD (IndexedDb -> NgRx Store)
// Entity
export const loadAll						= createAction('[Entity] Load All', props<{ entityType: EntityType }>());
export const loadAllSuccess					= createAction('[Entity] Load All Success', props<{ entityType: EntityType, entities: Entity[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }>());

export const loadOne						= createAction('[Entity] Load One', props<{ entityType: EntityType, id: UUID }>());
export const loadOneSuccess					= createAction('[Entity] Load One Success', props<{ entityType: EntityType, id: UUID, entity: Entity | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const unloadOne						= createAction('[Entity] Unload One', props<{ entityType: EntityType, id: UUID }>());

// SyncData
export const loadOneSyncData				= createAction('[Entity] Load One SyncData', props<{ entityType: EntityType, id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[Entity] Load One SyncData Success', props<{ entityType: EntityType, syncData: SyncData | null }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[Entity] Load All RemoteMetadata', props<{ entityType: EntityType }>());
export const loadAllRemoteMetadataSuccess	= createAction('[Entity] Load All RemoteMetadata Success', props<{ entityType: EntityType, remoteMetadata: RemoteMetadata[] }>());

// CLOUD SYNC
// local_new
export const syncLocalNew					= createAction('[Entity] Sync Local New');

// local_updated
export const syncLocalUpdated				= createAction('[Entity] Sync Local Updated');

// local_deleted
export const syncLocalDeleted				= createAction('[Entity] Sync Local Deleted');

// remote_new
export const syncRemoteNew					= createAction('[Entity] Sync Remote New');

// remote_updated
export const syncRemoteUpdated				= createAction('[Entity] Sync Remote Updated');

// remote_deleted
export const syncRemoteDeleted				= createAction('[Entity] Sync Remote Deleted');

// deleted_deleted
export const syncDeletedDeleted				= createAction('[Entity] Sync Deleted Deleted');
