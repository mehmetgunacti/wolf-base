import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { downloadRemoteDataSuccess, loadFirstConflict, loadFirstConflictSuccess, loadItemSuccess, loadTrashItemSuccess } from 'store/actions/stats-bookmark.actions';
import { closeConflictDialog } from 'store/actions/stats.actions';
import { StatsModuleState, initialStatsState } from 'store/states/stats.state';

export const statsReducer: ActionReducer<StatsModuleState, Action> = createReducer(

	initialStatsState,
	on(loadFirstConflict, (state): StatsModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = null;
				draft.selectedItem = null;
				draft.selectedTrashItem = null;
				draft.selectedRemoteData = null;
				draft.conflictDialogVisible = true;

			}
		)

	}),
	on(loadFirstConflictSuccess, (state, { syncData }): StatsModuleState => {

		return produce(
			state,
			draft => { draft.selectedSyncData = syncData; }
		)

	}),
	on(loadItemSuccess, (state, { item }): StatsModuleState => {

		return produce(
			state,
			draft => { draft.selectedItem = item }

		)

	}),
	on(loadTrashItemSuccess, (state, { item }): StatsModuleState => {

		return produce(
			state,
			draft => { draft.selectedTrashItem = item }

		)

	}),
	on(downloadRemoteDataSuccess, (state, { remoteData }): StatsModuleState => {

		return produce(
			state,
			draft => { draft.selectedRemoteData = remoteData }
		)

	}),
	on(closeConflictDialog, (state): StatsModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = null;
				draft.selectedItem = null;
				draft.selectedTrashItem = null;
				draft.selectedRemoteData = null;
				draft.conflictDialogVisible = false;

			}
		)

	})

);
