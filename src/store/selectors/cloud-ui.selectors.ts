import { createSelector } from "@ngrx/store";
import { CloudTask } from "lib";
import { selBookmarkConflictCloudTasks, selBookmarkNonConflictCloudTasks } from "./cloud-bookmark.selectors";
import { selCloudModuleState } from "./cloud.selectors";

export const selCloudIsConflictDialogVisible = createSelector(

	selCloudModuleState,
	state => state.conflictDialogVisible

);

export const selCloudConflictDialogTitle = createSelector(

	selCloudModuleState,
	state => state.conflictDialogTitle

);

export const selCloudMenuBadgeNumbers = createSelector(

	selBookmarkNonConflictCloudTasks,
	selBookmarkConflictCloudTasks,
	(nonConflicts: CloudTask[], conflicts: CloudTask[]): number[] => {

		const lengthOfNonConflicts = nonConflicts.length;
		const lengthOfConflicts = conflicts.length;
		return [lengthOfConflicts + lengthOfNonConflicts, lengthOfConflicts];

	}

);