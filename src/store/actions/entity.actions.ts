import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AppEntityType, UUID } from '@constants';
import { Entity, RemoteMetadata, SyncData } from '@models';

export const entityActions = createActionGroup({

	source: 'Entity',
	events: {

		// CRUD
		create						: props<{ entityType: AppEntityType, entity: Partial<Entity> }>(),
		createSuccess				: props<{ entityType: AppEntityType, entity: Entity }>(),

		update						: props<{ entityType: AppEntityType, id: UUID, entity: Partial<any> }>(),
		updateSuccess				: props<{ entityType: AppEntityType, id: UUID }>(),

		moveToTrash					: props<{ entityType: AppEntityType, id: UUID }>(),
		moveToTrashSuccess			: props<{ entityType: AppEntityType, id: UUID }>(),

		// LOAD (IndexedDb -> NgRx Store)
		// Entity
		loadOne						: props<{ entityType: AppEntityType, id: UUID }>(),
		loadOneSuccess				: props<{ entityType: AppEntityType, id: UUID, entity: Entity | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>(),

		unloadOne					: props<{ entityType: AppEntityType, id: UUID }>(),

		// SyncData
		loadOneSyncData				: props<{ entityType: AppEntityType, id: UUID }>(),
		loadOneSyncDataSuccess		: props<{ entityType: AppEntityType, syncData: SyncData | null }>(),

		//// RemoteMetadata
		downloadRemoteMetadata			: emptyProps(),
		downloadRemoteMetadataSuccess	: props<{ data: Record<AppEntityType, RemoteMetadata[]> }>(),

		// CLOUD SYNC
		// local_new
		syncLocalNew				: props<{ entityType: AppEntityType }>(),

		// local_updated
		syncLocalUpdated			: props<{ entityType: AppEntityType }>(),

		// local_deleted
		syncLocalDeleted			: props<{ entityType: AppEntityType }>(),

		// remote_new
		syncRemoteNew				: props<{ entityType: AppEntityType }>(),

		// remote_updated
		syncRemoteUpdated			: props<{ entityType: AppEntityType }>(),

		// remote_deleted
		syncRemoteDeleted			: props<{ entityType: AppEntityType }>(),

		// deleted_deleted
		syncDeletedDeleted			: props<{ entityType: AppEntityType }>()

	}

});
