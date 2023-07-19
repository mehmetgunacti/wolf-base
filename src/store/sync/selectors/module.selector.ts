import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SyncModuleState } from "store/states/sync.state";

export const syncModuleState = createFeatureSelector<SyncModuleState>('sync');

export const messages = createSelector(

	syncModuleState,
	(state: SyncModuleState): string[] => state.messages

);
