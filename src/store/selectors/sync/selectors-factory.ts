import { AppEntityType, CloudTask, Entity, RemoteMetadata, SyncData, SyncTaskType, toCloudTask, UUID } from '@lib';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import * as filterFn from './filter-functions.util';

export function createSyncSelectors<T extends Entity>(

	entityType: AppEntityType,
	selEntityList: MemoizedSelector<object, T[]>,
	selSyncDataList: MemoizedSelector<object, SyncData[]>,
	selSyncDataMap: MemoizedSelector<object, Record<UUID, SyncData>>,
	selRemoteMetadataList: MemoizedSelector<object, RemoteMetadata[]>,
	selRemoteMetadataMap: MemoizedSelector<object, Record<UUID, RemoteMetadata>>

) {

	const selLocalNew = createSelector(

		selEntityList,
		selSyncDataMap,
		filterFn.listOf_LocalNew

	);

	const selSyncDataLocalUpdatedIds = createSelector(

		selSyncDataList,
		selRemoteMetadataMap,
		filterFn.listOf_LocalUpdatedIds

	);

	const selLocalUpdated = createSelector(

		selEntityList,
		selSyncDataLocalUpdatedIds,
		filterFn.listOf_LocalUpdated

	);

	const selSyncDataLocalDeletedIds = createSelector(

		selSyncDataList,
		selRemoteMetadataMap,
		filterFn.listOf_LocalDeletedIds

	);

	const selLocalDeleted = createSelector(

		selSyncDataList,
		selSyncDataLocalDeletedIds,
		filterFn.listOf_LocalDeleted

	);

	const selRemoteNew = createSelector(

		selRemoteMetadataList,
		selSyncDataMap,
		filterFn.listOf_RemoteNew

	);

	const selRemoteUpdated = createSelector(

		selRemoteMetadataList,
		selSyncDataMap,
		filterFn.listOf_RemoteUpdatedIds

	);

	const selRemoteDeleted = createSelector(

		selRemoteMetadataMap,
		selSyncDataList,
		filterFn.listOf_RemoteDeleted

	);

	const selLocalUpdatedRemoteUpdated = createSelector(

		selSyncDataList,
		selRemoteMetadataMap,
		filterFn.listOf_LocalUpdatedRemoteUpdated

	);

	const selLocalDeletedRemoteDeleted = createSelector(

		selSyncDataList,
		selRemoteMetadataMap,
		filterFn.listOf_LocalDeletedRemoteDeleted

	);

	const selLocalUpdatedRemoteDeleted = createSelector(

		selSyncDataList,
		selRemoteMetadataMap,
		filterFn.listOf_LocalUpdatedRemoteDeleted

	);

	const selLocalDeletedRemoteUpdated = createSelector(

		selSyncDataList,
		selRemoteMetadataMap,
		filterFn.listOf_LocalDeletedRemoteUpdated

	);

	const selNonConflictCloudTasks = createSelector(

		selLocalNew,
		selLocalUpdated,
		selLocalDeleted,
		selRemoteNew,
		selRemoteUpdated,
		selRemoteDeleted,
		selLocalDeletedRemoteDeleted,
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
				tasks.push(toCloudTask(localNew, entityType, SyncTaskType.local_new));

			if (localUpdated.length > 0)
				tasks.push(toCloudTask(localUpdated, entityType, SyncTaskType.local_updated));

			if (localDeleted.length > 0)
				tasks.push(toCloudTask(localDeleted, entityType, SyncTaskType.local_deleted));

			if (remoteNew.length > 0)
				tasks.push(toCloudTask(remoteNew, entityType, SyncTaskType.remote_new));

			if (remoteUpdated.length > 0)
				tasks.push(toCloudTask(remoteUpdated, entityType, SyncTaskType.remote_updated));

			if (remoteDeleted.length > 0)
				tasks.push(toCloudTask(remoteDeleted, entityType, SyncTaskType.remote_deleted));

			if (localDeletedRemoteDeleted.length > 0)
				tasks.push(toCloudTask(localDeletedRemoteDeleted, entityType, SyncTaskType.deleted_deleted));

			return tasks;

		}

	);

	const selConflictCloudTasks = createSelector(

		selLocalUpdatedRemoteUpdated,
		selLocalUpdatedRemoteDeleted,
		selLocalDeletedRemoteUpdated,
		(
			localUpdatedRemoteUpdated,
			localUpdatedRemoteDeleted,
			localDeletedRemoteUpdated,
		): CloudTask[] => {

			const tasks: CloudTask[] = [];

			if (localUpdatedRemoteUpdated.length > 0)
				tasks.push(toCloudTask(localUpdatedRemoteUpdated, entityType, SyncTaskType.updated_updated));

			if (localUpdatedRemoteDeleted.length > 0)
				tasks.push(toCloudTask(localUpdatedRemoteDeleted, entityType, SyncTaskType.updated_deleted));

			if (localDeletedRemoteUpdated.length > 0)
				tasks.push(toCloudTask(localDeletedRemoteUpdated, entityType, SyncTaskType.deleted_updated));

			return tasks;

		}

	);

	const selCloudTasks = createSelector(

		selNonConflictCloudTasks,
		selConflictCloudTasks,
		(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

	);


	return {

		selLocalNew,
		selLocalUpdated,
		selLocalDeleted,
		selRemoteNew,
		selRemoteUpdated,
		selRemoteDeleted,
		selLocalUpdatedRemoteUpdated,
		selLocalDeletedRemoteDeleted,
		selLocalUpdatedRemoteDeleted,
		selLocalDeletedRemoteUpdated,
		selCloudTasks

	};

}
