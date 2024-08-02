import { CloudTask, NameBase, SyncTaskType, UUID, WolfEntity, toCloudTask } from '@lib';
import { createSelector } from '@ngrx/store';
import { selTask_array } from './task-entities.selectors';
import { selTaskRemoteMetadataArray, selTaskRemoteMetadataMap, selTaskSyncDataArray, selTaskSyncDataMap } from './task-sync.selectors';

export const selTask_LocalNew = createSelector(

	selTask_array,
	selTaskSyncDataMap,
	(tasks, syncDataMap): NameBase[] => tasks.filter(entity => !syncDataMap[entity.id])

);

const selTask_SyncDataLocalUpdatedIds = createSelector(

	selTaskSyncDataArray,
	selTaskRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selTask_LocalUpdated = createSelector(

	selTask_array,
	selTask_SyncDataLocalUpdatedIds,
	(tasks, ids): NameBase[] => tasks.filter(

		e => ids.includes(e.id)

	)

);

const selTask_SyncDataLocalDeletedIds = createSelector(

	selTaskSyncDataArray,
	selTaskRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selTask_LocalDeleted = createSelector(

	selTaskSyncDataArray,
	selTask_SyncDataLocalDeletedIds,
	(syncData, ids): NameBase[] => syncData.filter(

		e => ids.includes(e.id)

	)

);

export const selTask_RemoteNew = createSelector(

	selTaskRemoteMetadataArray,
	selTaskSyncDataMap,
	(remote, local): NameBase[] => remote.filter(r => !local[r.id])

);

export const selTask_RemoteUpdated = createSelector(

	selTaskRemoteMetadataArray,
	selTaskSyncDataMap,
	(remote, local): NameBase[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selTask_RemoteDeleted = createSelector(

	selTaskSyncDataArray,
	selTaskRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selTask_LocalUpdatedRemoteUpdated = createSelector(

	selTaskSyncDataArray,
	selTaskRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selTask_LocalDeletedRemoteDeleted = createSelector(

	selTaskSyncDataArray,
	selTaskRemoteMetadataMap,
	(syncData, remote): NameBase[] => syncData.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selTask_LocalUpdatedRemoteDeleted = createSelector(

	selTaskSyncDataArray,
	selTaskRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selTask_LocalDeletedRemoteUpdated = createSelector(

	selTaskSyncDataArray,
	selTaskRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

const selTask_NonConflictCloudTasks = createSelector(

	selTask_LocalNew,
	selTask_LocalUpdated,
	selTask_LocalDeleted,
	selTask_RemoteNew,
	selTask_RemoteUpdated,
	selTask_RemoteDeleted,
	selTask_LocalDeletedRemoteDeleted,
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
			tasks.push(toCloudTask(localNew, WolfEntity.task, SyncTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated, WolfEntity.task, SyncTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted, WolfEntity.task, SyncTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew, WolfEntity.task, SyncTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated, WolfEntity.task, SyncTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted, WolfEntity.task, SyncTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted, WolfEntity.task, SyncTaskType.deleted_deleted));

		return tasks;

	}

);

const selTask_ConflictCloudTasks = createSelector(

	selTask_LocalUpdatedRemoteUpdated,
	selTask_LocalUpdatedRemoteDeleted,
	selTask_LocalDeletedRemoteUpdated,
	(
		localUpdatedRemoteUpdated,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated,
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localUpdatedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteUpdated, WolfEntity.task, SyncTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted, WolfEntity.task, SyncTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated, WolfEntity.task, SyncTaskType.deleted_updated));

		return tasks;

	}

);

export const selTaskCloudTasks = createSelector(

	selTask_NonConflictCloudTasks,
	selTask_ConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
