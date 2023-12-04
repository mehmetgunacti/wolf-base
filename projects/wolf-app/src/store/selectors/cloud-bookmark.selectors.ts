import { Bookmark, CloudTask, SyncTaskType, Entity, RemoteMetadata, SyncData, UUID, WolfEntity, NameBase, toCloudTask } from '@lib';
import { createSelector } from "@ngrx/store";
import { selBookmarkArray, selBookmarkClicked } from "./bookmark-entities.selectors";
import { selBookmarkRemoteMetadataArray, selBookmarkRemoteMetadataMap, selBookmarkSyncDataArray, selBookmarkSyncDataMap } from "./bookmark-sync.selectors";

export const selBookmarkLocalNew = createSelector(

	selBookmarkArray,
	selBookmarkSyncDataMap,
	(bookmarks, syncDataMap): NameBase[] => bookmarks.filter(entity => !syncDataMap[entity.id])

);

const selBookmarkSyncDataLocalUpdatedIds = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selBookmarkLocalUpdated = createSelector(

	selBookmarkArray,
	selBookmarkSyncDataLocalUpdatedIds,
	(bookmarks, ids): NameBase[] => bookmarks.filter(

		e => ids.includes(e.id)

	)

);

const selBookmarkSyncDataLocalDeletedIds = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selBookmarkLocalDeleted = createSelector(

	selBookmarkArray,
	selBookmarkSyncDataLocalDeletedIds,
	(bookmarks, ids): NameBase[] => bookmarks.filter(

		e => ids.includes(e.id)

	)

);

export const selBookmarkRemoteNew = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): NameBase[] => remote.filter(r => !local[r.id])

);

export const selBookmarkRemoteUpdated = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): NameBase[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selBookmarkRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selBookmarkLocalUpdatedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selBookmarkLocalDeletedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): NameBase[] => syncData.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selBookmarkLocalUpdatedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selBookmarkLocalDeletedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selBookmarkNonConflictCloudTasks = createSelector(

	selBookmarkLocalNew,
	selBookmarkLocalUpdated,
	selBookmarkLocalDeleted,
	selBookmarkRemoteNew,
	selBookmarkRemoteUpdated,
	selBookmarkRemoteDeleted,
	selBookmarkLocalDeletedRemoteDeleted,
	selBookmarkClicked,
	(
		localNew,
		localUpdated,
		localDeleted,
		remoteNew,
		remoteUpdated,
		remoteDeleted,
		localDeletedRemoteDeleted,
		clicked
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localNew.length > 0)
			tasks.push(toCloudTask(localNew, WolfEntity.bookmark, SyncTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated, WolfEntity.bookmark, SyncTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted, WolfEntity.bookmark, SyncTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew, WolfEntity.bookmark, SyncTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated, WolfEntity.bookmark, SyncTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted, WolfEntity.bookmark, SyncTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted, WolfEntity.bookmark, SyncTaskType.deleted_deleted));

		if (clicked.length > 0)
			tasks.push(toCloudTask(clicked, WolfEntity.bookmark, SyncTaskType.clicked));

		return tasks;

	}

);

export const selBookmarkConflictCloudTasks = createSelector(

	selBookmarkLocalUpdatedRemoteUpdated,
	selBookmarkLocalUpdatedRemoteDeleted,
	selBookmarkLocalDeletedRemoteUpdated,
	(
		localUpdatedRemoteUpdated,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated,
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localUpdatedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteUpdated, WolfEntity.bookmark, SyncTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted, WolfEntity.bookmark, SyncTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated, WolfEntity.bookmark, SyncTaskType.deleted_updated));

		return tasks;

	}

);

export const selBookmarkCloudTasks = createSelector(

	selBookmarkNonConflictCloudTasks,
	selBookmarkConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
