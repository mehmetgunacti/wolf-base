import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CloudModuleState } from "store/states/cloud.state";

export const selCloudModuleState = createFeatureSelector<CloudModuleState>('cloud');

export const selCloudSelectedConflict = createSelector(

	selCloudModuleState,
	state => state.selectedSyncData

);

export const selCloudSelectedItem = createSelector(

	selCloudModuleState,
	state => state.selectedEntity

);

export const selCloudSelectedTrashItem = createSelector(

	selCloudModuleState,
	state => state.selectedTrashEntity

);

export const selCloudSelectedRemoteData = createSelector(

	selCloudModuleState,
	state => state.selectedRemoteData

);

export const selCloudSelectedRemoteMetadata = createSelector(

	selCloudModuleState,
	state => state.selectedRemoteMetadata

);