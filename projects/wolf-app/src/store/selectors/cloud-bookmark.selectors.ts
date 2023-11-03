import { CloudTask, CloudTaskType, Entity, Metadata, RemoteMetadata, SyncData, WolfEntity, createCloudTask } from '@lib';
import { createSelector } from "@ngrx/store";
import { selBookmarkArray, selBookmarkClicked } from "./bookmark-entities.selectors";
import { selBookmarkRemoteMetadataArray, selBookmarkRemoteMetadataMap, selBookmarkSyncDataArray, selBookmarkSyncDataMap } from "./bookmark-sync.selectors";

export const selBookmarkLocalNew = createSelector(

	selBookmarkArray,
	selBookmarkSyncDataMap,
	(localEntities, syncDataMap): Entity[] => localEntities.filter(entity => !syncDataMap[entity.id])

);

export const selBookmarkLocalUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): Entity[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	)

);

export const selBookmarkLocalDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): Entity[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	)

);

export const selBookmarkRemoteNew = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): Entity[] => remote.filter(r => !local[r.id])

);

export const selBookmarkRemoteUpdated = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): Entity[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selBookmarkRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): Entity[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selBookmarkLocalUpdatedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): Entity[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selBookmarkLocalDeletedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): Entity[] => local.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selBookmarkLocalUpdatedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): Entity[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selBookmarkLocalDeletedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): Entity[] => local.filter(

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
			tasks.push(createCloudTask(localNew, WolfEntity.bookmarks, CloudTaskType.local_new, 'upload'));

		if (localUpdated.length > 0)
			tasks.push(createCloudTask(localUpdated, WolfEntity.bookmarks, CloudTaskType.local_updated, 'upload'));

		if (localDeleted.length > 0)
			tasks.push(createCloudTask(localDeleted, WolfEntity.bookmarks, CloudTaskType.local_deleted, 'upload'));

		if (remoteNew.length > 0)
			tasks.push(createCloudTask(remoteNew, WolfEntity.bookmarks, CloudTaskType.remote_new, 'download'));

		if (remoteUpdated.length > 0)
			tasks.push(createCloudTask(remoteUpdated, WolfEntity.bookmarks, CloudTaskType.remote_updated, 'download'));

		if (remoteDeleted.length > 0)
			tasks.push(createCloudTask(remoteDeleted, WolfEntity.bookmarks, CloudTaskType.remote_deleted, 'download'));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(createCloudTask(localDeletedRemoteDeleted, WolfEntity.bookmarks, CloudTaskType.deleted_deleted, 'download'));

		if (clicked.length > 0)
			tasks.push(createCloudTask(clicked, WolfEntity.bookmarks, CloudTaskType.clicked, 'upload'));

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
			tasks.push(createCloudTask(localUpdatedRemoteUpdated, WolfEntity.bookmarks, CloudTaskType.updated_updated, 'view'));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(createCloudTask(localUpdatedRemoteDeleted, WolfEntity.bookmarks, CloudTaskType.updated_deleted, 'view'));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(createCloudTask(localDeletedRemoteUpdated, WolfEntity.bookmarks, CloudTaskType.deleted_updated, 'view'));

		return tasks;

	}

);

export const selBookmarkCloudTasks = createSelector(

	selBookmarkNonConflictCloudTasks,
	selBookmarkConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
