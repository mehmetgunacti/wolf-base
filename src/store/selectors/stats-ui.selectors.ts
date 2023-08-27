import { createSelector } from "@ngrx/store";
import { selStatsModuleState } from "./stats.selectors";

export const selIsConflictDialogVisible = createSelector(

    selStatsModuleState,
    state => state.conflictDialogVisible

);


export const selStatsMenuBadge = createSelector(

    selStatsModuleState,
    (state): number[] => [4, 1]

);