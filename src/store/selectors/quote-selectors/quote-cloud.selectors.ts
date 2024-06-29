import { CloudTask, NameBase, SyncTaskType, UUID, WolfEntity, toCloudTask } from '@lib';
import { createSelector } from '@ngrx/store';
import { selQuote_array } from './quote-entities.selectors';
import { selQuoteRemoteMetadataArray, selQuoteRemoteMetadataMap, selQuoteSyncDataArray, selQuoteSyncDataMap } from './quote-sync.selectors';

export const selQuote_LocalNew = createSelector(

	selQuote_array,
	selQuoteSyncDataMap,
	(quotes, syncDataMap): NameBase[] => quotes.filter(entity => !syncDataMap[entity.id])

);

const selQuote_SyncDataLocalUpdatedIds = createSelector(

	selQuoteSyncDataArray,
	selQuoteRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selQuote_LocalUpdated = createSelector(

	selQuote_array,
	selQuote_SyncDataLocalUpdatedIds,
	(quotes, ids): NameBase[] => quotes.filter(

		e => ids.includes(e.id)

	)

);

const selQuote_SyncDataLocalDeletedIds = createSelector(

	selQuoteSyncDataArray,
	selQuoteRemoteMetadataMap,
	(syncData, remote): UUID[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	).map(s => s.id)

);

export const selQuote_LocalDeleted = createSelector(

	selQuoteSyncDataArray,
	selQuote_SyncDataLocalDeletedIds,
	(syncData, ids): NameBase[] => syncData.filter(

		e => ids.includes(e.id)

	)

);

export const selQuote_RemoteNew = createSelector(

	selQuoteRemoteMetadataArray,
	selQuoteSyncDataMap,
	(remote, local): NameBase[] => remote.filter(r => !local[r.id])

);

export const selQuote_RemoteUpdated = createSelector(

	selQuoteRemoteMetadataArray,
	selQuoteSyncDataMap,
	(remote, local): NameBase[] => remote.filter(

		r => local[r.id] && !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

export const selQuote_RemoteDeleted = createSelector(

	selQuoteSyncDataArray,
	selQuoteRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

export const selQuote_LocalUpdatedRemoteUpdated = createSelector(

	selQuoteSyncDataArray,
	selQuoteRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selQuote_LocalDeletedRemoteDeleted = createSelector(

	selQuoteSyncDataArray,
	selQuoteRemoteMetadataMap,
	(syncData, remote): NameBase[] => syncData.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

export const selQuote_LocalUpdatedRemoteDeleted = createSelector(

	selQuoteSyncDataArray,
	selQuoteRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

export const selQuote_LocalDeletedRemoteUpdated = createSelector(

	selQuoteSyncDataArray,
	selQuoteRemoteMetadataMap,
	(local, remote): NameBase[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

const selQuote_NonConflictCloudTasks = createSelector(

	selQuote_LocalNew,
	selQuote_LocalUpdated,
	selQuote_LocalDeleted,
	selQuote_RemoteNew,
	selQuote_RemoteUpdated,
	selQuote_RemoteDeleted,
	selQuote_LocalDeletedRemoteDeleted,
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
			tasks.push(toCloudTask(localNew, WolfEntity.quote, SyncTaskType.local_new));

		if (localUpdated.length > 0)
			tasks.push(toCloudTask(localUpdated, WolfEntity.quote, SyncTaskType.local_updated));

		if (localDeleted.length > 0)
			tasks.push(toCloudTask(localDeleted, WolfEntity.quote, SyncTaskType.local_deleted));

		if (remoteNew.length > 0)
			tasks.push(toCloudTask(remoteNew, WolfEntity.quote, SyncTaskType.remote_new));

		if (remoteUpdated.length > 0)
			tasks.push(toCloudTask(remoteUpdated, WolfEntity.quote, SyncTaskType.remote_updated));

		if (remoteDeleted.length > 0)
			tasks.push(toCloudTask(remoteDeleted, WolfEntity.quote, SyncTaskType.remote_deleted));

		if (localDeletedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteDeleted, WolfEntity.quote, SyncTaskType.deleted_deleted));

		return tasks;

	}

);

const selQuote_ConflictCloudTasks = createSelector(

	selQuote_LocalUpdatedRemoteUpdated,
	selQuote_LocalUpdatedRemoteDeleted,
	selQuote_LocalDeletedRemoteUpdated,
	(
		localUpdatedRemoteUpdated,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated,
	): CloudTask[] => {

		const tasks: CloudTask[] = [];

		if (localUpdatedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteUpdated, WolfEntity.quote, SyncTaskType.updated_updated));

		if (localUpdatedRemoteDeleted.length > 0)
			tasks.push(toCloudTask(localUpdatedRemoteDeleted, WolfEntity.quote, SyncTaskType.updated_deleted));

		if (localDeletedRemoteUpdated.length > 0)
			tasks.push(toCloudTask(localDeletedRemoteUpdated, WolfEntity.quote, SyncTaskType.deleted_updated));

		return tasks;

	}

);

export const selQuoteCloudTasks = createSelector(

	selQuote_NonConflictCloudTasks,
	selQuote_ConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): CloudTask[] => [...nonConflicts, ...conflicts]

);
