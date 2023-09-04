import { createSelector } from "@ngrx/store";
import { selStatsModuleState } from "./stats.selectors";
import { selBookmarkStatsSummary } from "./stats-bookmark.selectors";
import { StatsSummary } from "lib";

export const selStatsIsConflictDialogVisible = createSelector(

	selStatsModuleState,
	state => state.conflictDialogVisible

);

export const selStatsConflictDialogTitle = createSelector(

	selStatsModuleState,
	state => state.conflictDialogTitle

);

export const selStatsMenuBadgeNumbers = createSelector(

	selBookmarkStatsSummary,
	(summary: StatsSummary): number[] => {

		const numberOfConflicts =
			summary.localDeletedRemoteDeleted.length +
			summary.localUpdatedRemoteDeleted.length +
			summary.localDeletedRemoteUpdated.length +
			summary.localUpdatedRemoteUpdated.length;

		const total =
			numberOfConflicts +
			summary.localNew.length +
			summary.localUpdated.length +
			summary.localDeleted.length +
			summary.localClicked.length +
			summary.remoteNew.length +
			summary.remoteUpdated.length +
			summary.remoteDeleted.length;

		return [total, numberOfConflicts];

	}

);