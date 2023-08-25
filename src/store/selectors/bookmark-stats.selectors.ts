import { createSelector } from "@ngrx/store";
import { StatsSummary, SyncData, UUID, isAfter } from "lib";
import { selBookmarkClickedCount, selBookmarksIds } from "./bookmark-entities.selectors";
import { selBookmarkRemoteMetadataArray, selBookmarkSyncDataArray } from "./bookmark-sync.selectors";

export const selBookmarkLocalCreatedIds = createSelector(

	selBookmarksIds,
	selBookmarkSyncDataArray,
	(localIds, syncData): UUID[] => {

		const syncIds = new Set(syncData.map(s => s.id));
		return localIds.filter(id => !syncIds.has(id));

	}

);

const bookmarkLocalUpdated = createSelector(

	selBookmarkSyncDataArray,
	(syncData): SyncData[] => syncData.filter(s => s.updated)

);

const bookmarklocalDeleted = createSelector(

	selBookmarkSyncDataArray,
	(syncData): SyncData[] => syncData.filter(s => s.deleted)

);

export const selBookmarkRemoteCreatedIds = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataArray,
	(remoteMetaData, syncData): UUID[] => {

		const syncIds = new Set(syncData.map(s => s.id));
		return remoteMetaData.map(r => r.id).filter(id => !syncIds.has(id));

	}

);

const remoteUpdatedBookmarkIds = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataArray,
	(remoteMetaData, syncData): UUID[] => {

		const syncIds = new Map<UUID, SyncData>();
		syncData.forEach(s => syncIds.set(s.id, s));
		return remoteMetaData.filter(r => {

			const syncData = syncIds.get(r.id);
			if (syncData)
				return isAfter(r.updateTime, syncData.updateTime);
			return false;

		}).map(r => r.id);

	}

);

const remoteDeletedBookmarkIds = createSelector(

	selBookmarkRemoteMetadataArray,
	selBookmarkSyncDataArray,
	(remoteMetaData, syncData): UUID[] => {

		const remoteIds = new Set(remoteMetaData.map(r => r.id));
		return syncData.map(r => r.id).filter(id => !remoteIds.has(id));

	}

);

const localErrorBookmarkIds1 = createSelector(

	/*
		1) local item deleted, remote item updated
		2) local item updated, remote item updated
		3) local item deleted, remote item deleted
		4) local item updated, remote item deleted
	*/
	
	selBookmarkSyncDataArray,
	// localUpdatedBookmarkIds,
	// localDeletedBookmarkIds,
	remoteUpdatedBookmarkIds,
	remoteDeletedBookmarkIds,
	(syncData, remoteUpdated, remoteDeleted): SyncData[] => {

		return syncData.filter(s => {

			s

		});

	}

);

export const selBookmarkStatsSummary = createSelector(

	selBookmarksIds,
	selBookmarkLocalCreatedIds,
	bookmarkLocalUpdated,
	bookmarklocalDeleted,
	selBookmarkClickedCount,
	selBookmarkRemoteMetadataArray,
	selBookmarkRemoteCreatedIds,
	remoteUpdatedBookmarkIds,
	remoteDeletedBookmarkIds,
	(localIds, localNew, localUpdated, localDeleted, clicked, remoteIds, remoteNew, remoteUpdated, remoteDeleted): StatsSummary => ({

		localTotal: localIds.length,
		localNew: localNew.length,
		localUpdated: localUpdated.length,
		localDeleted: localDeleted.length,
		localClicked: clicked,

		remoteTotal: remoteIds.length,
		remoteNew: remoteNew.length,
		remoteUpdated: remoteUpdated.length,
		remoteDeleted: remoteDeleted.length,

		localUpdatedRemoteUpdated: 0,
		localDeletedRemoteDeleted: 0,
		localUpdatedRemoteDeleted: 0,
		localDeletedRemoteUpdated: 0

	})

);