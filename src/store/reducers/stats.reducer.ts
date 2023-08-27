import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { downloadRemoteDataSuccess, loadEntitySuccess, loadTrashEntitySuccess } from 'store/actions/stats-bookmark.actions';
import { closeConflictDialog } from 'store/actions/stats.actions';
import { StatsModuleState, initialStatsState } from 'store/states/stats.state';

export const statsReducer: ActionReducer<StatsModuleState, Action> = createReducer(

	initialStatsState,
	// on(loadFirstConflict, (state): StatsModuleState => {

	// 	return produce(
	// 		state,
	// 		draft => {

	// 			draft.selectedSyncData = null;
	// 			draft.selectedEntity = null;
	// 			draft.selectedTrashEntity = null;
	// 			draft.selectedRemoteData = null;
	// 			draft.conflictDialogVisible = true;

	// 		}
	// 	)

	// }),
	// on(loadFirstConflictSuccess, (state, { syncData }): StatsModuleState => ({ ...state, selectedSyncData: syncData })),
	on(loadEntitySuccess, (state, { entity }): StatsModuleState => ({ ...state, selectedEntity: entity })),
	on(loadTrashEntitySuccess, (state, { entity }): StatsModuleState => ({ ...state, selectedTrashEntity: entity })),
	on(downloadRemoteDataSuccess, (state, { remoteData }): StatsModuleState => ({ ...state, selectedRemoteData: remoteData })),
	on(closeConflictDialog, (state): StatsModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = null;
				draft.selectedEntity = null;
				draft.selectedTrashEntity = null;
				draft.selectedRemoteData = null;
				draft.conflictDialogVisible = false;

			}
		)

	})

);
