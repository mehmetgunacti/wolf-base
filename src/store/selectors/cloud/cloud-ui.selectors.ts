import { createSelector } from '@ngrx/store';
import { selCloudModuleState } from './cloud.selectors';

export const selCloudIsConflictDialogVisible = createSelector(

	selCloudModuleState,
	state => state.conflictDialogVisible

);

export const selCloudConflictDialogTitle = createSelector(

	selCloudModuleState,
	state => state.conflictDialogTitle

);
