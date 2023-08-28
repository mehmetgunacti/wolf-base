import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { downloadRemoteDataSuccess, loadEntitySuccess, loadTrashEntitySuccess, viewLocalUntouchedRemoteDeleted, viewLocalUntouchedRemoteDeletedSuccess } from 'store/actions/stats-bookmark.actions';
import { closeConflictDialog } from 'store/actions/stats.actions';
import { StatsModuleState, initialStatsState } from 'store/states/stats.state';

const hideConflictDialog = (state: StatsModuleState): StatsModuleState => {

	return produce(
		state,
		draft => {

			draft.selectedSyncData = null;
			draft.selectedEntity = null;
			draft.selectedTrashEntity = null;
			draft.selectedRemoteData = null;
			draft.conflictDialogVisible = false;
			draft.conflictDialogTitle = null;

		}
	)

}

export const statsReducer: ActionReducer<StatsModuleState, Action> = createReducer(

	initialStatsState,
	on(viewLocalUntouchedRemoteDeleted, hideConflictDialog),
	on(viewLocalUntouchedRemoteDeletedSuccess, (state, { syncData, bookmark }): StatsModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = syncData;
				draft.selectedEntity = bookmark;
				draft.selectedTrashEntity = null;
				draft.selectedRemoteData = null;
				draft.conflictDialogTitle = 'Local Untouched, Remote Deleted';
				draft.conflictDialogVisible = true;

			}
		)

	}),
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
