import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { syncEvent } from '../actions';
import { SyncModuleState, initialSyncState } from '../states';

export const syncReducer: ActionReducer<SyncModuleState, Action> = createReducer(

	initialSyncState,
	on(syncEvent, (state, { when, collection, message, inProgress }) => {

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
