import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { syncMessage } from '../actions';
import { SyncState, initialSyncState } from '../states';

export const syncReducer: ActionReducer<SyncState, Action> = createReducer(

	initialSyncState,
	on(syncMessage, (state, { message, inProgress }) => {

		return produce(
			state,
			draft => {
				if (inProgress)
					draft.inProgress = inProgress;
				if (message)
					draft.messages = [...draft.messages, message];
			}
		);

	})

);
