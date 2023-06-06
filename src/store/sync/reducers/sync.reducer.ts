import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { syncSetState, syncStart } from '../actions';
import { SyncState, initialSyncState } from '../states';

export const syncReducer: ActionReducer<SyncState, Action> = createReducer(

	initialSyncState,
	on(syncSetState, (state, { message }) => {

		return produce(
			state,
			draft => {
				draft.status = message.status;
				if (message.message)
					draft.messages = [...draft.messages, message.message];
			}
		);

	})

);
