import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatsModuleState } from "store/states/stats.state";

export const selStatsModuleState = createFeatureSelector<StatsModuleState>('stats');

export const selStatsSelectedConflict = createSelector(

	selStatsModuleState,
	state => state.selectedSyncData

);

export const selStatsSelectedItem = createSelector(

	selStatsModuleState,
	state => state.selectedEntity

);

export const selStatsSelectedTrashItem = createSelector(

	selStatsModuleState,
	state => state.selectedTrashEntity

);

export const selStatsSelectedRemoteData = createSelector(

	selStatsModuleState,
	state => state.selectedRemoteData

);

export const selStatsSelectedRemoteMetadata = createSelector(

	selStatsModuleState,
	state => state.selectedRemoteMetadata

);