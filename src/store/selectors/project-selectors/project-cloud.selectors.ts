import { CloudTask, NameBase, SyncTaskType, UUID, AppEntityType, toCloudTask } from '@lib';
import { createSelector } from '@ngrx/store';
import { selProject_array } from './project-entities.selectors';
import { selProjectRemoteMetadataArray, selProjectRemoteMetadataMap, selProjectSyncDataArray, selProjectSyncDataMap } from './project-sync.selectors';

export const selProject_LocalNew = createSelector(

	selProject_array,
	selProjectSyncDataMap,
	(projects, syncDataMap): NameBase[] => projects.filter(entity => !syncDataMap[entity.id])

);

const selProject_SyncDataLocalUpdatedIds = createSelector(

	selProjectSyncDataArray,
	selProjectRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selProject_LocalUpdated = createSelector(

	selProject_array,
	selProject_SyncDataLocalUpdatedIds,
	(projects, ids): NameBase[] => projects.filter(

		e => ids.includes(e.id)

	)

);

const selProject_SyncDataLocalDeletedIds = createSelector(

	selProjectSyncDataArray,
	selProjectRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selProject_LocalDeleted = createSelector(

	selProjectSyncDataArray,
	selProject_SyncDataLocalDeletedIds,
	(syncData, ids): NameBase[] => syncData.filter(

		e => ids.includes(e.id)

	)

);

export const selProject_RemoteNew = createSelector(

	selProjectRemoteMetadataArray,
	selProjectSyncDataMap,
	(remote, local): NameBase[] => remote.filter(r => !local[r.id])

);

export const selProject_RemoteUpdated = createSelector(

	selProjectRemoteMetadataArray,
	selProjectSyncDataMap,
	(remote, local): NameBase[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selProject_RemoteDeleted = createSelector(

	selProjectSyncDataArray,
	selProjectRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selProject_LocalUpdatedRemoteUpdated = createSelector(

	selProjectSyncDataArray,
	selProjectRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selProject_LocalDeletedRemoteDeleted = createSelector(

	selProjectSyncDataArray,
	selProjectRemoteMetadataMap,
	(syncData, remote): NameBase[] => syncData.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selProject_LocalUpdatedRemoteDeleted = createSelector(

	selProjectSyncDataArray,
	selProjectRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selProject_LocalDeletedRemoteUpdated = createSelector(

	selProjectSyncDataArray,
	selProjectRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

const selProject_NonConflictCloudTasks = createSelector(

	selProject_LocalNew,
	selProject_LocalUpdated,
	selProject_LocalDeleted,
	selProject_RemoteNew,
	selProject_RemoteUpdated,
	selProject_RemoteDeleted,
	selProject_LocalDeletedRemoteDeleted,
	(
		localNew,
		localUpdated,
		localDeleted,
		remoteNew,
		remoteUpdated,
		remoteDeleted,
		localDeletedRemoteDeleted
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localNew.length > 0)
			tasks.push(toCloudTask(localNew, AppEntityType.project, SyncTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated, AppEntityType.project, SyncTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted, AppEntityType.project, SyncTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew, AppEntityType.project, SyncTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated, AppEntityType.project, SyncTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted, AppEntityType.project, SyncTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted, AppEntityType.project, SyncTaskType.deleted_deleted));

		return tasks;

	}

);

const selProject_ConflictCloudTasks = createSelector(

	selProject_LocalUpdatedRemoteUpdated,
	selProject_LocalUpdatedRemoteDeleted,
	selProject_LocalDeletedRemoteUpdated,
	(
		localUpdatedRemoteUpdated,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated,
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localUpdatedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteUpdated, AppEntityType.project, SyncTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted, AppEntityType.project, SyncTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated, AppEntityType.project, SyncTaskType.deleted_updated));

		return tasks;

	}

);

export const selProject_CloudTasks = createSelector(

	selProject_NonConflictCloudTasks,
	selProject_ConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
