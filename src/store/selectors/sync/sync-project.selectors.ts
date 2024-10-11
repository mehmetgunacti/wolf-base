import { AppEntityType, Project } from '@lib';
import * as sel from '../entity/entity-project.selectors';
import { createSyncSelectors } from '../sync/selectors-factory';

const entityType = AppEntityType.project;

export const {

	selLocalNew: selProject_LocalNew,
	selLocalUpdated: selProject_LocalUpdated,
	selLocalDeleted: selProject_LocalDeleted,
	selRemoteNew: selProject_RemoteNew,
	selRemoteUpdated: selProject_RemoteUpdated,
	selRemoteDeleted: selProject_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selProject_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selProject_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selProject_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selProject_LocalDeletedRemoteUpdated,
	selCloudTasks: selProject_CloudTasks

} = createSyncSelectors<Project>(
	entityType,
	sel.selProject_EntityList,
	sel.selProject_SyncDataList,
	sel.selProject_SyncDataMap,
	sel.selProject_RemoteMetadataList,
	sel.selProject_RemoteMetadataMap
);
