import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import * as fromCore from 'store/core';
import * as fromActions from '../actions';
import * as fromStates from '../states';

export const syncReducer: ActionReducer<fromStates.SyncModuleState, Action> = createReducer(

	fromStates.initialSyncState,
	on(fromActions.syncEvent, (state, { when, collection, message, inProgress }): fromStates.SyncModuleState => {

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
	on(fromActions.showFirestoreDialog, (state): fromStates.SyncModuleState => ({ ...state, firestoreConfigDialogVisible: true })),
	on(fromActions.closeFirestoreDialog, (state): fromStates.SyncModuleState => ({ ...state, firestoreConfigDialogVisible: false })),
	on(fromCore.saveFirestoreConfigSuccess, (state): fromStates.SyncModuleState => ({ ...state, firestoreConfigDialogVisible: false }))
);
