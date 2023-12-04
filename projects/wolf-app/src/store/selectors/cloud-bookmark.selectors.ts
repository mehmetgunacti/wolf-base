import { Bookmark, CloudTask, CloudTaskType, Entity, SyncData, UUID, WolfEntity, createCloudTask } from '@lib';
import { createSelector } from "@ngrx/store";
import { selBookmarkArray, selBookmarkClicked } from "./bookmark-entities.selectors";
import { selBookmarkRemoteMetadataArray, selBookmarkRemoteMetadataMap, selBookmarkSyncDataArray, selBookmarkSyncDataMap } from "./bookmark-sync.selectors";

export const selBookmarkLocalNew = createSelector(

	selBookmarkArray,
	selBookmarkSyncDataMap,
	(localEntities, syncDataMap): Bookmark[] => localEntities.filter(entity => !syncDataMap[entity.id])

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
	(bookmarks, ids): Bookmark[] => bookmarks.filter(

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
	(bookmarks, ids): Bookmark[] => bookmarks.filter(

		e => ids.includes(e.id)

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
			tasks.push(createCloudTask(localNew, WolfEntity.bookmark, CloudTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(createCloudTask(localUpdated, WolfEntity.bookmark, CloudTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(createCloudTask(localDeleted, WolfEntity.bookmark, CloudTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(createCloudTask(remoteNew, WolfEntity.bookmark, CloudTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(createCloudTask(remoteUpdated, WolfEntity.bookmark, CloudTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(createCloudTask(remoteDeleted, WolfEntity.bookmark, CloudTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(createCloudTask(localDeletedRemoteDeleted, WolfEntity.bookmark, CloudTaskType.deleted_deleted));

		if (clicked.length > 0)
			tasks.push(createCloudTask(clicked, WolfEntity.bookmark, CloudTaskType.clicked));

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
			tasks.push(createCloudTask(localUpdatedRemoteUpdated, WolfEntity.bookmark, CloudTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(createCloudTask(localUpdatedRemoteDeleted, WolfEntity.bookmark, CloudTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(createCloudTask(localDeletedRemoteUpdated, WolfEntity.bookmark, CloudTaskType.deleted_updated));

		return tasks;

	}

);

export const selBookmarkCloudTasks = createSelector(

	selBookmarkNonConflictCloudTasks,
	selBookmarkConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
