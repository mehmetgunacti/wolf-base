import { CloudTask, NameBase, SyncTaskType, UUID, WolfEntity, toCloudTask } from '@lib';
import { createSelector } from '@ngrx/store';
import { selQuizEntry_array } from './quiz-entry-entities.selectors';
import { selQuizEntryRemoteMetadataArray, selQuizEntryRemoteMetadataMap, selQuizEntrySyncDataArray, selQuizEntrySyncDataMap } from './quiz-entry-sync.selectors';

export const selQuizEntry_LocalNew = createSelector(

	selQuizEntry_array,
	selQuizEntrySyncDataMap,
	(quizEntries, syncDataMap): NameBase[] => quizEntries.filter(entity => !syncDataMap[entity.id])

);

const selQuizEntry_SyncDataLocalUpdatedIds = createSelector(

	selQuizEntrySyncDataArray,
	selQuizEntryRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selQuizEntry_LocalUpdated = createSelector(

	selQuizEntry_array,
	selQuizEntry_SyncDataLocalUpdatedIds,
	(quizEntries, ids): NameBase[] => quizEntries.filter(

		e => ids.includes(e.id)

	)

);

const selQuizEntry_SyncDataLocalDeletedIds = createSelector(

	selQuizEntrySyncDataArray,
	selQuizEntryRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selQuizEntry_LocalDeleted = createSelector(

	selQuizEntrySyncDataArray,
	selQuizEntry_SyncDataLocalDeletedIds,
	(syncData, ids): NameBase[] => syncData.filter(

		e => ids.includes(e.id)

	)

);

export const selQuizEntry_RemoteNew = createSelector(

	selQuizEntryRemoteMetadataArray,
	selQuizEntrySyncDataMap,
	(remote, local): NameBase[] => remote.filter(r => !local[r.id])

);

export const selQuizEntry_RemoteUpdated = createSelector(

	selQuizEntryRemoteMetadataArray,
	selQuizEntrySyncDataMap,
	(remote, local): NameBase[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selQuizEntry_RemoteDeleted = createSelector(

	selQuizEntrySyncDataArray,
	selQuizEntryRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selQuizEntry_LocalUpdatedRemoteUpdated = createSelector(

	selQuizEntrySyncDataArray,
	selQuizEntryRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selQuizEntry_LocalDeletedRemoteDeleted = createSelector(

	selQuizEntrySyncDataArray,
	selQuizEntryRemoteMetadataMap,
	(syncData, remote): NameBase[] => syncData.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selQuizEntry_LocalUpdatedRemoteDeleted = createSelector(

	selQuizEntrySyncDataArray,
	selQuizEntryRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selQuizEntry_LocalDeletedRemoteUpdated = createSelector(

	selQuizEntrySyncDataArray,
	selQuizEntryRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

const selQuizEntry_NonConflictCloudTasks = createSelector(

	selQuizEntry_LocalNew,
	selQuizEntry_LocalUpdated,
	selQuizEntry_LocalDeleted,
	selQuizEntry_RemoteNew,
	selQuizEntry_RemoteUpdated,
	selQuizEntry_RemoteDeleted,
	selQuizEntry_LocalDeletedRemoteDeleted,
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
			tasks.push(toCloudTask(localNew, WolfEntity.quizEntry, SyncTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated, WolfEntity.quizEntry, SyncTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted, WolfEntity.quizEntry, SyncTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew, WolfEntity.quizEntry, SyncTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated, WolfEntity.quizEntry, SyncTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted, WolfEntity.quizEntry, SyncTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted, WolfEntity.quizEntry, SyncTaskType.deleted_deleted));

		return tasks;

	}

);

const selQuizEntry_ConflictCloudTasks = createSelector(

	selQuizEntry_LocalUpdatedRemoteUpdated,
	selQuizEntry_LocalUpdatedRemoteDeleted,
	selQuizEntry_LocalDeletedRemoteUpdated,
	(
		localUpdatedRemoteUpdated,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated,
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localUpdatedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteUpdated, WolfEntity.quizEntry, SyncTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted, WolfEntity.quizEntry, SyncTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated, WolfEntity.quizEntry, SyncTaskType.deleted_updated));

		return tasks;

	}

);

export const selQuizEntryCloudTasks = createSelector(

	selQuizEntry_NonConflictCloudTasks,
	selQuizEntry_ConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
