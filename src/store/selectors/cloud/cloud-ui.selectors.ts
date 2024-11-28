import { createSelector } from '@ngrx/store';
import { selCloud_ModuleState } from './cloud.selectors';

export const selCloudIsConflictDialogVisible = createSelector(

	selCloud_ModuleState,
	state => state.conflictDialogVisible

);

export const selCloudConflictDialogTitle = createSelector(

	selCloud_ModuleState,
	state => state.conflictDialogTitle

);
