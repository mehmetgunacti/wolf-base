import { CloudTask, NameBase, SyncTaskType, UUID, WolfEntity, toCloudTask } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNoteContent_array } from './note-content-entities.selectors';
import { selNoteContent_remoteMetadataArray, selNoteContent_remoteMetadataMap, selNoteContent_syncDataArray, selNoteContent_syncDataMap } from './note-content-sync.selectors';

export const selNoteContentLocalNew = createSelector(

	selNoteContent_array,
	selNoteContent_syncDataMap,
	(noteContents, syncDataMap): NameBase[] => noteContents.filter(entity => !syncDataMap[entity.id])

);

const selNoteContentSyncDataLocalUpdatedIds = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selNoteContentLocalUpdated = createSelector(

	selNoteContent_array,
	selNoteContentSyncDataLocalUpdatedIds,
	(noteContents, ids): NameBase[] => noteContents.filter(

		e => ids.includes(e.id)

	)

);

const selNoteContentSyncDataLocalDeletedIds = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selNoteContentLocalDeleted = createSelector(

	selNoteContent_syncDataArray,
	selNoteContentSyncDataLocalDeletedIds,
	(syncData, ids): NameBase[] => syncData.filter(

		e => ids.includes(e.id)

	)

);

export const selNoteContentRemoteNew = createSelector(

	selNoteContent_remoteMetadataArray,
	selNoteContent_syncDataMap,
	(remote, local): NameBase[] => remote.filter(r => !local[r.id])

);

export const selNoteContentRemoteUpdated = createSelector(

	selNoteContent_remoteMetadataArray,
	selNoteContent_syncDataMap,
	(remote, local): NameBase[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selNoteContentRemoteDeleted = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selNoteContentLocalUpdatedRemoteUpdated = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selNoteContentLocalDeletedRemoteDeleted = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(syncData, remote): NameBase[] => syncData.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selNoteContentLocalUpdatedRemoteDeleted = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selNoteContentLocalDeletedRemoteUpdated = createSelector(

	selNoteContent_syncDataArray,
	selNoteContent_remoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selNoteContentNonConflictCloudTasks = createSelector(

	selNoteContentLocalNew,
	selNoteContentLocalUpdated,
	selNoteContentLocalDeleted,
	selNoteContentRemoteNew,
	selNoteContentRemoteUpdated,
	selNoteContentRemoteDeleted,
	selNoteContentLocalDeletedRemoteDeleted,
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
			tasks.push(toCloudTask(localNew, WolfEntity.note_content, SyncTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated, WolfEntity.note_content, SyncTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted, WolfEntity.note_content, SyncTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew, WolfEntity.note_content, SyncTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated, WolfEntity.note_content, SyncTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted, WolfEntity.note_content, SyncTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted, WolfEntity.note_content, SyncTaskType.deleted_deleted));

		return tasks;

	}

);

export const selNoteContentConflictCloudTasks = createSelector(

	selNoteContentLocalUpdatedRemoteUpdated,
	selNoteContentLocalUpdatedRemoteDeleted,
	selNoteContentLocalDeletedRemoteUpdated,
	(
		localUpdatedRemoteUpdated,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated,
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localUpdatedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteUpdated, WolfEntity.note_content, SyncTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted, WolfEntity.note_content, SyncTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated, WolfEntity.note_content, SyncTaskType.deleted_updated));

		return tasks;

	}

);

export const selNoteContentCloudTasks = createSelector(

	selNoteContentNonConflictCloudTasks,
	selNoteContentConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
