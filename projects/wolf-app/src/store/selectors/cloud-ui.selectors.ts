import { CloudTask } from '@lib';
import { createSelector } from "@ngrx/store";
import { selBookmarkConflictCloudTasks, selBookmarkNonConflictCloudTasks } from './bookmark-selectors/bookmark-cloud.selectors';
import { selCloudModuleState } from "./cloud.selectors";

export const selCloudIsConflictDialogVisible = createSelector(

	selCloudModuleState,
	state => state.conflictDialogVisible

);

export const selCloudConflictDialogTitle = createSelector(

	selCloudModuleState,
	state => state.conflictDialogTitle

);
