import { createSelector } from "@ngrx/store";
import { selStatsModuleState } from "./stats.selectors";

export const selStatsIsConflictDialogVisible = createSelector(

    selStatsModuleState,
    state => state.conflictDialogVisible

);

export const selStatsConflictDialogTitle = createSelector(

    selStatsModuleState,
    state => state.conflictDialogTitle

);

export const selStatsMenuBadge = createSelector(

    selStatsModuleState,
    (state): number[] => [4, 1]

);