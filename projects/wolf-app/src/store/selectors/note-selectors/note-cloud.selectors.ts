import { CloudTask, NameBase, SyncTaskType, UUID, WolfEntity, toCloudTask } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNote_array } from './note-entities.selectors';
import { selNoteRemoteMetadataArray, selNoteRemoteMetadataMap, selNoteSyncDataArray, selNoteSyncDataMap } from './note-sync.selectors';

export const selNote_LocalNew = createSelector(

	selNote_array,
	selNoteSyncDataMap,
	(notes, syncDataMap): NameBase[] => notes.filter(entity => !syncDataMap[entity.id])

);

const selNote_SyncDataLocalUpdatedIds = createSelector(

	selNoteSyncDataArray,
	selNoteRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selNote_LocalUpdated = createSelector(

	selNote_array,
	selNote_SyncDataLocalUpdatedIds,
	(notes, ids): NameBase[] => notes.filter(

		e => ids.includes(e.id)

	)

);

const selNote_SyncDataLocalDeletedIds = createSelector(

	selNoteSyncDataArray,
	selNoteRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selNote_LocalDeleted = createSelector(

	selNoteSyncDataArray,
	selNote_SyncDataLocalDeletedIds,
	(syncData, ids): NameBase[] => syncData.filter(

		e => ids.includes(e.id)

	)

);

export const selNote_RemoteNew = createSelector(

	selNoteRemoteMetadataArray,
	selNoteSyncDataMap,
	(remote, local): NameBase[] => remote.filter(r => !local[r.id])

);

export const selNote_RemoteUpdated = createSelector(

	selNoteRemoteMetadataArray,
	selNoteSyncDataMap,
	(remote, local): NameBase[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selNote_RemoteDeleted = createSelector(

	selNoteSyncDataArray,
	selNoteRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selNote_LocalUpdatedRemoteUpdated = createSelector(

	selNoteSyncDataArray,
	selNoteRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selNote_LocalDeletedRemoteDeleted = createSelector(

	selNoteSyncDataArray,
	selNoteRemoteMetadataMap,
	(syncData, remote): NameBase[] => syncData.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selNote_LocalUpdatedRemoteDeleted = createSelector(

	selNoteSyncDataArray,
	selNoteRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selNote_LocalDeletedRemoteUpdated = createSelector(

	selNoteSyncDataArray,
	selNoteRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

const selNote_NonConflictCloudTasks = createSelector(

	selNote_LocalNew,
	selNote_LocalUpdated,
	selNote_LocalDeleted,
	selNote_RemoteNew,
	selNote_RemoteUpdated,
	selNote_RemoteDeleted,
	selNote_LocalDeletedRemoteDeleted,
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
			tasks.push(toCloudTask(localNew, WolfEntity.note, SyncTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated, WolfEntity.note, SyncTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted, WolfEntity.note, SyncTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew, WolfEntity.note, SyncTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated, WolfEntity.note, SyncTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted, WolfEntity.note, SyncTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted, WolfEntity.note, SyncTaskType.deleted_deleted));

		return tasks;

	}

);

const selNote_ConflictCloudTasks = createSelector(

	selNote_LocalUpdatedRemoteUpdated,
	selNote_LocalUpdatedRemoteDeleted,
	selNote_LocalDeletedRemoteUpdated,
	(
		localUpdatedRemoteUpdated,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated,
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localUpdatedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteUpdated, WolfEntity.note, SyncTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted, WolfEntity.note, SyncTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated, WolfEntity.note, SyncTaskType.deleted_updated));

		return tasks;

	}

);

export const selNoteCloudTasks = createSelector(

	selNote_NonConflictCloudTasks,
	selNote_ConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
