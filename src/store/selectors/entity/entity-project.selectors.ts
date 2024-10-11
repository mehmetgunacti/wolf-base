import { AppEntityType, Project } from '@lib';
import { createEntitySelectors } from '../entity/selectors-factory';

export const {

	selEntityState: selProject_EntityState,
	selEntityMap: selProject_EntityMap,
	selEntityList: selProject_EntityList,
	selEntityCount: selProject_EntityCount,
	selEntityIds: selProject_EntityIds,
	selSyncDataMap: selProject_SyncDataMap,
	selSyncDataList: selProject_SyncDataList,
	selRemoteMetadataMap: selProject_RemoteMetadataMap,
	selRemoteMetadataList: selProject_RemoteMetadataList

} = createEntitySelectors<Project>(AppEntityType.project);
