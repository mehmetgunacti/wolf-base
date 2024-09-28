import { AppEntityType, Entity, RemoteMetadata, SyncData, UUID } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const entityActions = createActionGroup({

	source: 'Entity',
	events: {

		// CRUD
		'Create'						: props<{ entityType: AppEntityType, entity: Partial<Entity> }>(),
		'Create Success'				: props<{ entityType: AppEntityType, entity: Entity }>(),

		'Update'						: props<{ entityType: AppEntityType, id: UUID, entity: Partial<any> }>(),
		'Update Success'				: props<{ entityType: AppEntityType, id: UUID }>(),

		'Move To Trash'					: props<{ entityType: AppEntityType, id: UUID }>(),
		'Move To Trash Success'			: props<{ entityType: AppEntityType, id: UUID }>(),

		// LOAD (IndexedDb -> NgRx Store)
		// Entity
		'Load All'						: props<{ filter: { entityType: AppEntityType, loadEntities: boolean, loadSyncData: boolean, loadRemoteMetadata: boolean }[] }>(),
		'Load All Success'				: props<{ data: { entityType: AppEntityType, entities: Entity[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }[] }>(),

		'Load One'						: props<{ entityType: AppEntityType, id: UUID }>(),
		'Load One Success'				: props<{ entityType: AppEntityType, id: UUID, entity: Entity | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>(),

		'Unload One'					: props<{ entityType: AppEntityType, id: UUID }>(),

		// SyncData
		'Load One SyncData'				: props<{ entityType: AppEntityType, id: UUID }>(),
		'Load One SyncData Success'		: props<{ entityType: AppEntityType, syncData: SyncData | null }>(),

		//// RemoteMetadata
		'Download RemoteMetadata'			: emptyProps(),
		'Download RemoteMetadata Success'	: props<{ data: Record<AppEntityType, RemoteMetadata[]> }>(),

		// CLOUD SYNC
		// local_new
		'Sync Local New'				: props<{ entityType: AppEntityType }>(),

		// local_updated
		'Sync Local Updated'			: props<{ entityType: AppEntityType }>(),

		// local_deleted
		'Sync Local Deleted'			: props<{ entityType: AppEntityType }>(),

		// remote_new
		'Sync Remote New'				: props<{ entityType: AppEntityType }>(),

		// remote_updated
		'Sync Remote Updated'			: props<{ entityType: AppEntityType }>(),

		// remote_deleted
		'Sync Remote Deleted'			: props<{ entityType: AppEntityType }>(),

		// deleted_deleted
		'Sync Deleted Deleted'			: props<{ entityType: AppEntityType }>()

	}

});
