import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StatsModuleState } from "store/states/stats.state";

export const selStatsModuleState = createFeatureSelector<StatsModuleState>('stats');

export const selStatsSelectedConflict = createSelector(

	selStatsModuleState,
	state => state.selectedSyncData

);

export const selStatsSelectedItem = createSelector(

	selStatsModuleState,
	state => state.selectedItem

);

export const selStatsSelectedTrashItem = createSelector(

	selStatsModuleState,
	state => state.selectedTrashItem

);

export const selStatsSelectedRemoteData = createSelector(

	selStatsModuleState,
	state => state.selectedRemoteData

);