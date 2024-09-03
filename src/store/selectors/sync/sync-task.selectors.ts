import { AppEntityType, Task } from '@lib';
import * as sel from '../entity/entity-task.selectors';
import { createSyncSelectors } from '../sync/selectors-factory';

const entityType = AppEntityType.task;

export const {

	selLocalNew: selTask_LocalNew,
	selLocalUpdated: selTask_LocalUpdated,
	selLocalDeleted: selTask_LocalDeleted,
	selRemoteNew: selTask_RemoteNew,
	selRemoteUpdated: selTask_RemoteUpdated,
	selRemoteDeleted: selTask_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selTask_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selTask_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selTask_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selTask_LocalDeletedRemoteUpdated,
	selCloudTasks: selTask_CloudTasks

} = createSyncSelectors<Task>(
	entityType,
	sel.selTask_EntityList,
	sel.selTask_SyncDataList,
	sel.selTask_SyncDataMap,
	sel.selTask_RemoteMetadataList,
	sel.selTask_RemoteMetadataMap
);
