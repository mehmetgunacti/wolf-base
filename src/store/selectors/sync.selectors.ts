import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SyncLog } from "lib";
import { SyncModuleState } from "store/states/sync.state";

export const syncModuleState = createFeatureSelector<SyncModuleState>('sync');

export const syncLogs = createSelector(

	syncModuleState,
	(state: SyncModuleState): SyncLog[] => state.syncLogs

);

export const isConflictDialogVisible = createSelector(

	syncModuleState,
	state => state.conflictDialogVisible

);

export const isSyncDialogVisible = createSelector(

	syncModuleState,
	state => state.syncDialogVisible

);

export const selectedConflict = createSelector(

	syncModuleState,
	state => state.selectedSyncData

);

export const selectedItem = createSelector(

	syncModuleState,
	state => state.selectedItem

);

export const selectedTrashItem = createSelector(

	syncModuleState,
	state => state.selectedTrashItem

);

export const selectedRemoteData = createSelector(

	syncModuleState,
	state => state.selectedRemoteData

);