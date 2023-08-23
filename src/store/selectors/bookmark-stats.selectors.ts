import { createSelector } from "@ngrx/store";
import { StatsSummary, SyncData, UUID, isAfter } from "lib";
import { selectorBookmarkClickedCount, selectorBookmarksIds } from "./bookmark-entities.selectors";
import { selectorBookmarkRemoteMetadataArray, selectorBookmarkSyncDataArray } from "./bookmark-sync.selectors";

export const selectorBookmarkLocalCreatedIds = createSelector(

	selectorBookmarksIds,
	selectorBookmarkSyncDataArray,
	(localIds, syncData): UUID[] => {

		const syncIds = new Set(syncData.map(s => s.id));
		return localIds.filter(id => !syncIds.has(id));

	}

);

const localUpdatedBookmarkIds = createSelector(

	selectorBookmarkSyncDataArray,
	(syncData): SyncData[] => syncData.filter(s => s.updated)

);

const localDeletedBookmarkIds = createSelector(

	selectorBookmarkSyncDataArray,
	(syncData): SyncData[] => syncData.filter(s => s.deleted)

);

const localErrorBookmarkIds = createSelector(

	selectorBookmarkSyncDataArray,
	(syncData): SyncData[] => syncData.filter(s => !!s.error)

);

export const selectorBookmarkRemoteCreatedIds = createSelector(

	selectorBookmarkRemoteMetadataArray,
	selectorBookmarkSyncDataArray,
	(remoteMetaData, syncData): UUID[] => {

		const syncIds = new Set(syncData.map(s => s.id));
		return remoteMetaData.map(r => r.id).filter(id => !syncIds.has(id));

	}

);

const remoteUpdatedBookmarkIds = createSelector(

	selectorBookmarkRemoteMetadataArray,
	selectorBookmarkSyncDataArray,
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

	selectorBookmarkRemoteMetadataArray,
	selectorBookmarkSyncDataArray,
	(remoteMetaData, syncData): UUID[] => {

		const remoteIds = new Set(remoteMetaData.map(r => r.id));
		return syncData.map(r => r.id).filter(id => !remoteIds.has(id));

	}

);

export const bookmarkStatsSummary = createSelector(

	selectorBookmarksIds,
	selectorBookmarkLocalCreatedIds,
	localUpdatedBookmarkIds,
	localDeletedBookmarkIds,
	selectorBookmarkClickedCount,
	localErrorBookmarkIds,
	selectorBookmarkRemoteMetadataArray,
	selectorBookmarkRemoteCreatedIds,
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