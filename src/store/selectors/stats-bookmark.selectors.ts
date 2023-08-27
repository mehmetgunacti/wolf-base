import { createSelector } from "@ngrx/store";
import { RemoteMetadata, StatsSummary, SyncData, UUID } from "lib";
import { selBookmarkClicked, selBookmarkIds } from "./bookmark-entities.selectors";
import { selBookmarkRemoteMetadataArray, selBookmarkRemoteMetadataMap, selBookmarkSyncDataArray, selBookmarkSyncDataMap } from "./bookmark-sync.selectors";

export const selBookmarkLocalCreatedIds = createSelector(

	selBookmarkIds,
	selBookmarkSyncDataMap,
	(localIds, syncData): UUID[] => localIds.filter(id => !syncData[id])

);

const bookmarkLocalUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): SyncData[] =>
		syncData
			.filter(s => s.updated && !s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime)

);

const bookmarklocalDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(syncData, remote): SyncData[] =>
		syncData
			.filter(s => s.deleted && remote[s.id] && s.updateTime === remote[s.id].updateTime)

);

export const selBookmarkRemoteCreated = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): RemoteMetadata[] => remote.filter(r => !local[r.id])

);

const remoteUpdatedBookmark = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): RemoteMetadata[] => remote.filter(

		r => !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime

	)

);

const remoteDeletedBookmark = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): RemoteMetadata[] => local.filter(

		sd => !sd.updated && !sd.deleted && !remote[sd.id]

	)

);

const localUpdatedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): SyncData[] => local.filter(

		sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

const localDeletedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): SyncData[] => local.filter(

		sd => sd.deleted && !remote[sd.id]

	)

);

const localUpdatedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): SyncData[] => local.filter(

		sd => sd.updated && !remote[sd.id]

	)

);

const localDeletedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): SyncData[] => local.filter(

		sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime

	)

);

export const selBookmarkStatsSummary = createSelector(

	selBookmarkIds,
	selBookmarkLocalCreatedIds,
	bookmarkLocalUpdated,
	bookmarklocalDeleted,
	selBookmarkClicked,
	selBookmarkRemoteMetadataArray,
	selBookmarkRemoteCreated,
	remoteUpdatedBookmark,
	remoteDeletedBookmark,
	localUpdatedRemoteUpdated,
	localDeletedRemoteDeleted, 
	localUpdatedRemoteDeleted,
	localDeletedRemoteUpdated,
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