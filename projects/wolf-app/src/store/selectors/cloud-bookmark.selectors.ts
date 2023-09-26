import { createSelector } from "@ngrx/store";
import { CloudTask, CloudTaskType, RemoteMetadata, SyncData, UUID, WolfEntity, toCloudTask } from "lib";
import { selBookmarkClicked, selBookmarkIds } from "./bookmark-entities.selectors";
import { selBookmarkRemoteMetadataArray, selBookmarkRemoteMetadataMap, selBookmarkSyncDataArray, selBookmarkSyncDataMap } from "./bookmark-sync.selectors";

export const selBookmarkLocalNew = createSelector(

	selBookmarkIds,
	selBookmarkSyncDataMap,
	(localIds, syncData): UUID[] => localIds.filter(id => !syncData[id])

);

export const selBookmarkLocalUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): SyncData[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	)

);

export const selBookmarkLocalDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): SyncData[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	)

);

export const selBookmarkRemoteNew = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): RemoteMetadata[] => remote.filter(r => !local[r.id])

);

export const selBookmarkRemoteUpdated = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): RemoteMetadata[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selBookmarkRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): SyncData[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selBookmarkLocalUpdatedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): SyncData[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selBookmarkLocalDeletedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): SyncData[] => local.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selBookmarkLocalUpdatedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): SyncData[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selBookmarkLocalDeletedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): SyncData[] => local.filter(

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
			tasks.push(toCloudTask(localNew.length, WolfEntity.bookmarks, CloudTaskType.local_new, 'success', 'upload'));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated.length, WolfEntity.bookmarks, CloudTaskType.local_updated, 'success', 'upload'));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted.length, WolfEntity.bookmarks, CloudTaskType.local_deleted, 'success', 'upload'));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew.length, WolfEntity.bookmarks, CloudTaskType.remote_new, 'success', 'download'));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated.length, WolfEntity.bookmarks, CloudTaskType.remote_updated, 'warning', 'download'));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted.length, WolfEntity.bookmarks, CloudTaskType.remote_deleted, 'warning', 'download'));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted.length, WolfEntity.bookmarks, CloudTaskType.deleted_deleted, 'success', 'download'));

		if (clicked.length > 0)
			tasks.push(toCloudTask(clicked.length, WolfEntity.bookmarks, CloudTaskType.clicked, 'success', 'upload'));

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
			tasks.push(toCloudTask(localUpdatedRemoteUpdated.length, WolfEntity.bookmarks, CloudTaskType.updated_updated, 'danger', 'view'));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted.length, WolfEntity.bookmarks, CloudTaskType.updated_deleted, 'danger', 'view'));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated.length, WolfEntity.bookmarks, CloudTaskType.deleted_updated, 'danger', 'view'));

		return tasks;

	}

);

export const selBookmarkCloudTasks = createSelector(

	selBookmarkNonConflictCloudTasks,
	selBookmarkConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);