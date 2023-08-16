import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { clearSyncLogs, closeConflictDialog, closeSyncDialog, downloadRemoteDataSuccess, loadFirstConflict, loadFirstConflictSuccess, loadItemSuccess, loadTrashItemSuccess, openSyncDialog, syncLogsSuccess, syncTrigger } from 'store/actions/sync.actions';
import { SyncModuleState, initialSyncState } from 'store/states/sync.state';

export const syncReducer: ActionReducer<SyncModuleState, Action> = createReducer(

	initialSyncState,
	on(syncLogsSuccess, (state, { syncLogs }): SyncModuleState => {

		return produce(
			state,
			draft => {

				draft.syncLogs = syncLogs;

			}
		);

	}),
	on(loadFirstConflict, (state): SyncModuleState => {

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
	on(loadFirstConflictSuccess, (state, { syncData }): SyncModuleState => {

		return produce(
			state,
			draft => { draft.selectedSyncData = syncData; }
		)

	}),
	on(loadItemSuccess, (state, { item }): SyncModuleState => {

		return produce(
			state,
			draft => { draft.selectedItem = item }

		)

	}),
	on(loadTrashItemSuccess, (state, { item }): SyncModuleState => {

		return produce(
			state,
			draft => { draft.selectedTrashItem = item }

		)

	}),
	on(downloadRemoteDataSuccess, (state, { remoteData }): SyncModuleState => {

		return produce(
			state,
			draft => { draft.selectedRemoteData = remoteData }
		)

	}),
	on(closeConflictDialog, (state): SyncModuleState => {

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

	}),
	on(syncTrigger, (state): SyncModuleState => ({ ...state, syncDialogVisible: true })),
	on(openSyncDialog, (state): SyncModuleState => ({ ...state, syncDialogVisible: true })),
	on(closeSyncDialog, (state): SyncModuleState => ({ ...state, syncDialogVisible: false })),
	on(clearSyncLogs, (state): SyncModuleState => ({ ...state, syncLogs: [] }))

);
