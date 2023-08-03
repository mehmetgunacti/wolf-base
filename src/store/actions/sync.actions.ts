import { createAction, props } from "@ngrx/store";
import { Entity, RemoteData, SyncData, SyncEvent, UUID } from "lib";

export const syncTrigger = createAction('[Sync] Trigger');
export const syncEvent = createAction('[Sync] Message', props<SyncEvent>());

export const openConflictDialog = createAction('[Sync] Open Conflict Dialog');
export const closeConflictDialog = createAction('[Sync] Close Conflict Dialog');

export const openSyncDialog = createAction('[Sync] Open Sync Dialog');
export const closeSyncDialog = createAction('[Sync] Close Sync Dialog');

export const loadFirstConflict = createAction('[Sync] Load First Conflict');
export const loadFirstConflictSuccess = createAction('[Sync] Load First Conflict Success', props<{ syncData: SyncData }>());

export const loadItemSuccess = createAction('[Sync] Load Item Success', props<{ item: Entity }>());
export const loadTrashItemSuccess = createAction('[Sync] Load Trash Item Success', props<{ item: Entity | null }>());
export const downloadRemoteDataSuccess = createAction('[Sync] Donwload RemoteData Success', props<{ remoteData: RemoteData<Entity> }>());

export const purgeLocalItem = createAction('[Sync] Purge Local Item', props<{ id: UUID }>());
export const purgeRemoteItem = createAction('[Sync] Purge Remote Item', props<{ id: UUID }>());
export const overrideLocalItem = createAction('[Sync] Override Local Item', props<{ remoteData: RemoteData<Entity> }>());
export const overrideRemoteItem = createAction('[Sync] Override Remote Item', props<{ entity: Entity }>());

export const clearMessages = createAction('[Sync] Clear Messages');