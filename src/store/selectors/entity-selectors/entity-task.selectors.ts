import { AppEntityType, Task } from '@lib';
import { createEntitySelectors } from '../entity-selectors/selectors-factory';

export const {

	selEntityState: selTask_EntityState,
	selEntityMap: selTask_EntityMap,
	selEntityList: selTask_EntityList,
	selEntityCount: selTask_EntityCount,
	selEntityIds: selTask_EntityIds,
	selSyncDataMap: selTask_SyncDataMap,
	selSyncDataList: selTask_SyncDataList,
	selRemoteMetadataMap: selTask_RemoteMetadataMap,
	selRemoteMetadataList: selTask_RemoteMetadataList

} = createEntitySelectors<Task>(AppEntityType.task);
