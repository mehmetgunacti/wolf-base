import { CloudTask, NameBase, SyncTaskType, UUID, AppEntityType, toCloudTask } from '@lib';
import { createSelector } from '@ngrx/store';
import { selWord_array } from './word-entities.selectors';
import { selWordRemoteMetadataArray, selWordRemoteMetadataMap, selWordSyncDataArray, selWordSyncDataMap } from './word-sync.selectors';

export const selWord_LocalNew = createSelector(

	selWord_array,
	selWordSyncDataMap,
	(words, syncDataMap): NameBase[] => words.filter(entity => !syncDataMap[entity.id])

);

const selWord_SyncDataLocalUpdatedIds = createSelector(

	selWordSyncDataArray,
	selWordRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selWord_LocalUpdated = createSelector(

	selWord_array,
	selWord_SyncDataLocalUpdatedIds,
	(words, ids): NameBase[] => words.filter(

		e => ids.includes(e.id)

	)

);

const selWord_SyncDataLocalDeletedIds = createSelector(

	selWordSyncDataArray,
	selWordRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selWord_LocalDeleted = createSelector(

	selWordSyncDataArray,
	selWord_SyncDataLocalDeletedIds,
	(syncData, ids): NameBase[] => syncData.filter(

		e => ids.includes(e.id)

	)

);

export const selWord_RemoteNew = createSelector(

	selWordRemoteMetadataArray,
	selWordSyncDataMap,
	(remote, local): NameBase[] => remote.filter(r => !local[r.id])

);

export const selWord_RemoteUpdated = createSelector(

	selWordRemoteMetadataArray,
	selWordSyncDataMap,
	(remote, local): NameBase[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selWord_RemoteDeleted = createSelector(

	selWordSyncDataArray,
	selWordRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selWord_LocalUpdatedRemoteUpdated = createSelector(

	selWordSyncDataArray,
	selWordRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selWord_LocalDeletedRemoteDeleted = createSelector(

	selWordSyncDataArray,
	selWordRemoteMetadataMap,
	(syncData, remote): NameBase[] => syncData.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selWord_LocalUpdatedRemoteDeleted = createSelector(

	selWordSyncDataArray,
	selWordRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selWord_LocalDeletedRemoteUpdated = createSelector(

	selWordSyncDataArray,
	selWordRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

const selWord_NonConflictCloudTasks = createSelector(

	selWord_LocalNew,
	selWord_LocalUpdated,
	selWord_LocalDeleted,
	selWord_RemoteNew,
	selWord_RemoteUpdated,
	selWord_RemoteDeleted,
	selWord_LocalDeletedRemoteDeleted,
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
			tasks.push(toCloudTask(localNew, AppEntityType.word, SyncTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated, AppEntityType.word, SyncTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted, AppEntityType.word, SyncTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew, AppEntityType.word, SyncTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated, AppEntityType.word, SyncTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted, AppEntityType.word, SyncTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted, AppEntityType.word, SyncTaskType.deleted_deleted));

		return tasks;

	}

);

const selWord_ConflictCloudTasks = createSelector(

	selWord_LocalUpdatedRemoteUpdated,
	selWord_LocalUpdatedRemoteDeleted,
	selWord_LocalDeletedRemoteUpdated,
	(
		localUpdatedRemoteUpdated,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated,
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localUpdatedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteUpdated, AppEntityType.word, SyncTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted, AppEntityType.word, SyncTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated, AppEntityType.word, SyncTaskType.deleted_updated));

		return tasks;

	}

);

export const selWordCloudTasks = createSelector(

	selWord_NonConflictCloudTasks,
	selWord_ConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
