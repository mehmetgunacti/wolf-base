import { AppEntityType, UUID } from '@constants';
import { Entity } from '@models';
import { createSelector } from '@ngrx/store';
import { Entity_EntitiesState } from '@states';
import { selEntity_ModuleState } from './entity.selectors';

export function createEntitySelectors<T extends Entity>(entityType: AppEntityType) {

	// MODULE STATE
	const selEntityState = createSelector(

		selEntity_ModuleState,
		state => state[ entityType ]

	);

	// ENTITY MAP
	const selEntityMap = createSelector<object, Entity_EntitiesState, Record<UUID, T>>(

		selEntityState,
		state => state.entities as Record<UUID, T>

	);

	// ENTITY LIST
	const selEntityList = createSelector(

		selEntityMap,
		map => Object.values(map)

	);

	// ENTITY IDs
	const selEntityIds = createSelector(

		selEntityMap,
		map => Object.keys(map)

	);

	// ENTITY COUNT
	const selEntityCount = createSelector(

		selEntityIds,
		ids => ids.length

	);

	// SYNC DATA MAP
	const selSyncDataMap = createSelector(

		selEntityState,
		state => state.syncData

	);

	// SYNC DATA LIST
	const selSyncDataList = createSelector(

		selSyncDataMap,
		map => Object.values(map)

	);

	// REMOTE METADATA MAP
	const selRemoteMetadataMap = createSelector(

		selEntityState,
		state => state.remoteMetadata

	);

	// REMOTE METADATA LIST
	const selRemoteMetadataList = createSelector(

		selRemoteMetadataMap,
		map => Object.values(map)

	);

	return {

		selEntityState,
		selEntityMap,
		selEntityList,
		selEntityIds,
		selEntityCount,
		selSyncDataMap,
		selSyncDataList,
		selRemoteMetadataMap,
		selRemoteMetadataList

	};

}
