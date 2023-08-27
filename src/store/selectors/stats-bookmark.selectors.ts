import { createSelector } from "@ngrx/store";
import { StatsSummary, SyncData, UUID } from "lib";
import { selBookmarkClickedCount, selBookmarkIds } from "./bookmark-entities.selectors";
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

export const selBookmarkRemoteCreatedIds = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): UUID[] =>
		remote
			.filter(r => !local[r.id])
			.map(r => r.id)

);

const remoteUpdatedBookmarkIds = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataMap,
	(remote, local): UUID[] =>
		remote
			.filter(r => !local[r.id].deleted && !local[r.id].updated && local[r.id].updateTime !== r.updateTime)
			.map(r => r.id)

);

const remoteDeletedBookmarkIds = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): UUID[] =>
		local
			.filter(sd => !sd.updated && !sd.deleted && !remote[sd.id])
			.map(r => r.id)

);

const localUpdatedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): UUID[] =>
		local
			.filter(sd => !sd.deleted && sd.updated && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime)
			.map(sd => sd.id)

);

const localDeletedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): UUID[] =>
		local
			.filter(sd => sd.deleted && !remote[sd.id])
			.map(sd => sd.id)

);

const localUpdatedRemoteDeleted = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): UUID[] =>
		local
			.filter(sd => sd.updated && !remote[sd.id])
			.map(sd => sd.id)

);

const localDeletedRemoteUpdated = createSelector(

	selBookmarkSyncDataArray,
	selBookmarkRemoteMetadataMap,
	(local, remote): UUID[] =>
		local
			.filter(sd => sd.deleted && remote[sd.id] && remote[sd.id].updateTime !== sd.updateTime)
			.map(sd => sd.id)

);

export const selBookmarkStatsSummary = createSelector(

	selBookmarkIds,
	selBookmarkLocalCreatedIds,
	bookmarkLocalUpdated,
	bookmarklocalDeleted,
	selBookmarkClickedCount,
	selBookmarkRemoteMetadataArray,
	selBookmarkRemoteCreatedIds,
	remoteUpdatedBookmarkIds,
	remoteDeletedBookmarkIds,
	localUpdatedRemoteUpdated,
	localDeletedRemoteDeleted,
	localUpdatedRemoteDeleted,
	localDeletedRemoteUpdated,
	(localIds, localNew, localUpdated, localDeleted, clicked, remoteIds, remoteNew, remoteUpdated, remoteDeleted, localUpdatedRemoteUpdated, localDeletedRemoteDeleted, localUpdatedRemoteDeleted, localDeletedRemoteUpdated): StatsSummary => ({

		localTotal: localIds.length,
		localNew: localNew.length,
		localUpdated: localUpdated.length,
		localDeleted: localDeleted.length,
		localClicked: clicked,

		remoteTotal: remoteIds.length,
		remoteNew: remoteNew.length,
		remoteUpdated: remoteUpdated.length,
		remoteDeleted: remoteDeleted.length,

		localUpdatedRemoteUpdated: localUpdatedRemoteUpdated.length,
		localDeletedRemoteDeleted: localDeletedRemoteDeleted.length,
		localUpdatedRemoteDeleted: localUpdatedRemoteDeleted.length,
		localDeletedRemoteUpdated: localDeletedRemoteUpdated.length

	})

);