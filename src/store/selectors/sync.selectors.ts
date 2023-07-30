import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SyncModuleState } from "store/states/sync.state";
import { bookmarks } from "./bookmark-entities.selectors";
import { Bookmark } from "lib";

export const syncModuleState = createFeatureSelector<SyncModuleState>('sync');

export const messages = createSelector(

	syncModuleState,
	(state: SyncModuleState): string[] => state.messages

);

export const isConflictDialogVisible = createSelector(

	syncModuleState,
	state => state.conflictDialogVisible

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