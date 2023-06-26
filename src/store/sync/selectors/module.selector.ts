import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SyncModuleState } from "../states";

export const syncModuleState = createFeatureSelector<SyncModuleState>('sync');

export const messages = createSelector(

	syncModuleState,
	(state: SyncModuleState): string[] => state.messages

);
