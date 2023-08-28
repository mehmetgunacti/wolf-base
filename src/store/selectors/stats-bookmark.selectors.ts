import { createSelector } from "@ngrx/store";
import { RemoteMetadata, StatsSummary, SyncData, UUID } from "lib";
import { selBookmarkClicked, selBookmarkIds } from "./bookmark-entities.selectors";
import { selBookmarkRemoteMetadataArray, selBookmarkRemoteMetadataMap, selBookmarkSyncDataArray, selBookmarkSyncDataMap } from "./bookmark-sync.selectors";

export const selBookmarkLocalCreatedIds = createSelector(

	selBookmarkIds,
	selBookmarkSyncDataMap,
	(localIds, syncData): UUID[] => localIds.filter(id => !syncData[id])

);

export const selBookmarkLocalUpdatedRemoteUntouched = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): SyncData[] => syncData.filter(

		s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	)

);

export const selBookmarkLocalDeletedRemoteUntouched = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): SyncData[] => syncData.filter(

		s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime

	)

);

export const selBookmarkRemoteCreated = createSelector(

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

export const selBookmarkStatsSummary = createSelector(

	selBookmarkIds,
	selBookmarkLocalCreatedIds,
	selBookmarkLocalUpdatedRemoteUntouched,
	selBookmarkLocalDeletedRemoteUntouched,
	selBookmarkClicked,
	selBookmarkRemoteMetadataArray,
	selBookmarkRemoteCreated,
	selBookmarkRemoteUpdated,
	selBookmarkRemoteDeleted,
	selBookmarkLocalUpdatedRemoteUpdated,
	selBookmarkLocalDeletedRemoteDeleted,
	selBookmarkLocalUpdatedRemoteDeleted,
	selBookmarkLocalDeletedRemoteUpdated,
	(localTotal, localNew, localUpdated, localDeleted, localClicked, remoteTotal, remoteNew, remoteUpdated, remoteDeleted, localUpdatedRemoteUpdated, localDeletedRemoteDeleted, localUpdatedRemoteDeleted, localDeletedRemoteUpdated): StatsSummary => ({

		localTotal,
		localNew,
		localUpdated,
		localDeleted,
		localClicked,

		remoteTotal,
		remoteNew,
		remoteUpdated,
		remoteDeleted,

		localUpdatedRemoteUpdated,
		localDeletedRemoteDeleted,
		localUpdatedRemoteDeleted,
		localDeletedRemoteUpdated

	})

);