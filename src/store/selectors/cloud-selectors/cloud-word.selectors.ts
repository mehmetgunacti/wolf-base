import { AppEntityType, CloudTask, RemoteMetadata, SyncData, SyncTaskType, toCloudTask, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selWord_EntitiesState } from '../entity-selectors/entity.selectors';
import { selWord_array } from '../word-selectors/word-entities.selectors';
import * as filterFn from './cloud-filter-functions.util';

const selWord_SyncDataArray = createSelector(

	selWord_EntitiesState,
	(state): SyncData[] => Object.values(state.syncData)

);

const selWord_SyncDataMap = createSelector(

	selWord_SyncDataArray,
	(arr): Record<UUID, SyncData> => arr.reduce(
		(acc, syncData) => {
			acc[syncData.id] = syncData;
			return acc;
		},
		{} as Record<string, SyncData>
	)

);

const selWord_RemoteMetadataArray = createSelector(

	selWord_EntitiesState,
	(state): RemoteMetadata[] => Object.values(state.remoteMetadata)

);

const selWord_RemoteMetadataMap = createSelector(

	selWord_RemoteMetadataArray,
	(arr): Record<UUID, RemoteMetadata> => arr.reduce(
		(acc, metadata) => {
			acc[metadata.id] = metadata;
			return acc;
		},
		{} as Record<string, RemoteMetadata>
	)

);

export const selWord_LocalNew = createSelector(

	selWord_array,
	selWord_SyncDataMap,
	filterFn.listOf_LocalNew

);

const selWord_SyncDataLocalUpdatedIds = createSelector(

	selWord_SyncDataArray,
	selWord_RemoteMetadataMap,
	filterFn.listOf_LocalUpdatedIds

);

export const selWord_LocalUpdated = createSelector(

	selWord_array,
	selWord_SyncDataLocalUpdatedIds,
	filterFn.listOf_LocalUpdated

);

const selWord_SyncDataLocalDeletedIds = createSelector(

	selWord_SyncDataArray,
	selWord_RemoteMetadataMap,
	filterFn.listOf_LocalDeletedIds

);

const selWord_LocalDeleted = createSelector(

	selWord_SyncDataArray,
	selWord_SyncDataLocalDeletedIds,
	filterFn.listOf_LocalDeleted

);

const selWord_RemoteNew = createSelector(

	selWord_RemoteMetadataArray,
	selWord_SyncDataMap,
	filterFn.listOf_RemoteNew

);

const selWord_RemoteUpdated = createSelector(

	selWord_RemoteMetadataArray,
	selWord_SyncDataMap,
	filterFn.listOf_RemoteUpdatedIds

);

export const selWord_RemoteDeleted = createSelector(

	selWord_RemoteMetadataMap,
	selWord_SyncDataArray,
	filterFn.listOf_RemoteDeleted

);

export const selWord_LocalUpdatedRemoteUpdated = createSelector(

	selWord_SyncDataArray,
	selWord_RemoteMetadataMap,
	filterFn.listOf_LocalUpdatedRemoteUpdated

);

export const selWord_LocalDeletedRemoteDeleted = createSelector(

	selWord_SyncDataArray,
	selWord_RemoteMetadataMap,
	filterFn.listOf_LocalDeletedRemoteDeleted

);

export const selWord_LocalUpdatedRemoteDeleted = createSelector(

	selWord_SyncDataArray,
	selWord_RemoteMetadataMap,
	filterFn.listOf_LocalUpdatedRemoteDeleted

);

export const selWord_LocalDeletedRemoteUpdated = createSelector(

	selWord_SyncDataArray,
	selWord_RemoteMetadataMap,
	filterFn.listOf_LocalDeletedRemoteUpdated

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

export const selWord_CloudTasks = createSelector(

	selWord_NonConflictCloudTasks,
	selWord_ConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
