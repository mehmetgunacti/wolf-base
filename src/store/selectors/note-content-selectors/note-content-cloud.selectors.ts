import { CloudTask, NameBase, SyncTaskType, UUID, EntityType, toCloudTask } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNoteContent_array } from './note-content-entities.selectors';
import { selNoteContent_remoteMetadataArray, selNoteContent_remoteMetadataMap, selNoteContent_syncDataArray, selNoteContent_syncDataMap } from './note-content-sync.selectors';

export const selNoteContent_LocalNew = createSelector(

	selNoteContent_array,
	selNoteContent_syncDataMap,
	(noteContents, syncDataMap): NameBase[] => noteContents.filter(entity => !syncDataMap[entity.id])

);

const selNoteContent_SyncDataLocalUpdatedIds = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selNoteContent_LocalUpdated = createSelector(

	selNoteContent_array,
	selNoteContent_SyncDataLocalUpdatedIds,
	(noteContents, ids): NameBase[] => noteContents.filter(

		e => ids.includes(e.id)

	)

);

const selNoteContent_SyncDataLocalDeletedIds = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selNoteContent_LocalDeleted = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_SyncDataLocalDeletedIds,
	(syncData, ids): NameBase[] => syncData.filter(

		e => ids.includes(e.id)

	)

);

export const selNoteContent_RemoteNew = createSelector(

	selNoteContent_remoteMetadataArray,
	selNoteContent_syncDataMap,
	(remote, local): NameBase[] => remote.filter(r => !local[r.id])

);

export const selNoteContent_RemoteUpdated = createSelector(

	selNoteContent_remoteMetadataArray,
	selNoteContent_syncDataMap,
	(remote, local): NameBase[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selNoteContent_RemoteDeleted = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selNoteContent_LocalUpdatedRemoteUpdated = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selNoteContent_LocalDeletedRemoteDeleted = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(syncData, remote): NameBase[] => syncData.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selNoteContent_LocalUpdatedRemoteDeleted = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

const selNoteContent_LocalDeletedRemoteUpdated = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

const selNoteContent_NonConflictCloudTasks = createSelector(

	selNoteContent_LocalNew,
	selNoteContent_LocalUpdated,
	selNoteContent_LocalDeleted,
	selNoteContent_RemoteNew,
	selNoteContent_RemoteUpdated,
	selNoteContent_RemoteDeleted,
	selNoteContent_LocalDeletedRemoteDeleted,
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
			tasks.push(toCloudTask(localNew, EntityType.noteContent, SyncTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated, EntityType.noteContent, SyncTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted, EntityType.noteContent, SyncTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew, EntityType.noteContent, SyncTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated, EntityType.noteContent, SyncTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted, EntityType.noteContent, SyncTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted, EntityType.noteContent, SyncTaskType.deleted_deleted));

		return tasks;

	}

);

export const selNoteContent_ConflictCloudTasks = createSelector(

	selNoteContent_LocalUpdatedRemoteUpdated,
	selNoteContent_LocalUpdatedRemoteDeleted,
	selNoteContent_LocalDeletedRemoteUpdated,
	(
		localUpdatedRemoteUpdated,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated,
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localUpdatedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteUpdated, EntityType.noteContent, SyncTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted, EntityType.noteContent, SyncTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated, EntityType.noteContent, SyncTaskType.deleted_updated));

		return tasks;

	}

);

export const selNoteContent_CloudTasks = createSelector(

	selNoteContent_NonConflictCloudTasks,
	selNoteContent_ConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
