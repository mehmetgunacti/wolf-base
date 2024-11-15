import { AppEntityType } from '@constants/entity.constant';
import { Task } from '@models/project.model';
import { createEntitySelectors } from '../entity/selectors-factory';

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
