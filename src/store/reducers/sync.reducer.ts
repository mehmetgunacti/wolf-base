import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { closeConflictDialog, downloadRemoteDataSuccess, loadFirstConflict, loadFirstConflictSuccess, loadItemSuccess, loadTrashItemSuccess, syncEvent } from 'store/actions/sync.actions';
import { SyncModuleState, initialSyncState } from 'store/states/sync.state';

export const syncReducer: ActionReducer<SyncModuleState, Action> = createReducer(

	initialSyncState,
	on(syncEvent, (state, { when, collection, message, inProgress }): SyncModuleState => {

		return produce(
			state,
			draft => {

				const newMessage = `${collection} ${when}: ${message}`;
				if (inProgress)
					draft.inProgress = inProgress;
				if (message)
					draft.messages = [...draft.messages, newMessage];

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

	})

);
