import { AppEntityType, Task } from '@lib';
import { createSyncSelectors } from '../sync-selectors/selectors-factory';
import {
	selEntityList,
	selRemoteMetadataList,
	selRemoteMetadataMap,
	selSyncDataList,
	selSyncDataMap
} from '../task-selectors/task-entity.selectors';

const entityType = AppEntityType.task;

export const {

	selLocalNew,
	selLocalUpdated,
	selLocalDeleted,
	selRemoteNew,
	selRemoteUpdated,
	selRemoteDeleted,
	selLocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated,
	selCloudTasks

} = createSyncSelectors<Task>(
	entityType,
	selEntityList,
	selSyncDataList,
	selSyncDataMap,
	selRemoteMetadataList,
	selRemoteMetadataMap
);
