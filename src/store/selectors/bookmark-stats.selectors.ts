import { createSelector } from "@ngrx/store";
import { StatsSummary, SyncData, UUID, isAfter } from "lib";
import { sltBookmarkClickedCount, sltBookmarksIds } from "./bookmark-entities.selectors";
import { sltBookmarkRemoteMetadataArray, sltBookmarkSyncDataArray } from "./bookmark-sync.selectors";

export const sltBookmarkLocalCreatedIds = createSelector(

	sltBookmarksIds,
	sltBookmarkSyncDataArray,
	(localIds, syncData): UUID[] => {

		const syncIds = new Set(syncData.map(s => s.id));
		return localIds.filter(id => !syncIds.has(id));

	}

);

const localUpdatedBookmarkIds = createSelector(

	sltBookmarkSyncDataArray,
	(syncData): SyncData[] => syncData.filter(s => s.updated)

);

const localDeletedBookmarkIds = createSelector(

	sltBookmarkSyncDataArray,
	(syncData): SyncData[] => syncData.filter(s => s.deleted)

);

const localErrorBookmarkIds = createSelector(

	/*
		1) local item deleted, remote item updated
		2) local item updated, remote item updated
		3) local item deleted, remote item deleted
		4) local item updated, remote item deleted
	*/
	
	sltBookmarkSyncDataArray,
	(syncData): SyncData[] => syncData.filter(s => !!s.error)

);

export const sltBookmarkRemoteCreatedIds = createSelector(

	sltBookmarkRemoteMetadataArray,
	sltBookmarkSyncDataArray,
	(remoteMetaData, syncData): UUID[] => {

		const syncIds = new Set(syncData.map(s => s.id));
		return remoteMetaData.map(r => r.id).filter(id => !syncIds.has(id));

	}

);

const remoteUpdatedBookmarkIds = createSelector(

	sltBookmarkRemoteMetadataArray,
	sltBookmarkSyncDataArray,
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

	sltBookmarkRemoteMetadataArray,
	sltBookmarkSyncDataArray,
	(remoteMetaData, syncData): UUID[] => {

		const remoteIds = new Set(remoteMetaData.map(r => r.id));
		return syncData.map(r => r.id).filter(id => !remoteIds.has(id));

	}

);

export const sltBookmarkStatsSummary = createSelector(

	sltBookmarksIds,
	sltBookmarkLocalCreatedIds,
	localUpdatedBookmarkIds,
	localDeletedBookmarkIds,
	sltBookmarkClickedCount,
	localErrorBookmarkIds,
	sltBookmarkRemoteMetadataArray,
	sltBookmarkRemoteCreatedIds,
	remoteUpdatedBookmarkIds,
	remoteDeletedBookmarkIds,
	(localIds, localNew, localUpdated, localDeleted, clicked, localError, remoteIds, remoteNew, remoteUpdated, remoteDeleted): StatsSummary => ({

		localTotal: localIds.length,
		localNew: localNew.length,
		localUpdated: localUpdated.length,
		localDeleted: localDeleted.length,
		localClicked: clicked,
		localError: localError.length,

		remoteTotal: remoteIds.length,
		remoteNew: remoteNew.length,
		remoteUpdated: remoteUpdated.length,
		remoteDeleted: remoteDeleted.length

	})

);