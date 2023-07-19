import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
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

	})

);
