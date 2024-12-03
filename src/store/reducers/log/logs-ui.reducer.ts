import { logActions } from '@actions/logs.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { log_initialUIState, Logs_UIState } from '@states/logs.state';
import { produce } from 'immer';

const reducer = createReducer(

	log_initialUIState,
	on(logActions.load, (state, { selectedId, categories, limit }): Logs_UIState => {

		return produce(
			state,
			draft => {

				if (selectedId) {

					draft.categories = [];
					draft.selectedId = selectedId;

				} else {

					draft.categories = categories;
					draft.selectedId = null;

				}
				draft.limit = limit ?? log_initialUIState.limit;

			}

		);

	})

);

export function logsUIReducer(state: Logs_UIState | undefined, action: Action): Logs_UIState {
	return reducer(state, action);
}
