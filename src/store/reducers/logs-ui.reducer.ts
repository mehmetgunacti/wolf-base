import { Action, createReducer, on } from '@ngrx/store';
import { Logs_UIState, initialLogsUIState } from 'store/states/logs.state';
import * as logActions from 'store/actions/logs.actions';
import { produce } from 'immer';

const reducer = createReducer(

	initialLogsUIState,
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
				draft.limit = limit ?? initialLogsUIState.limit;

			}

		);

	})

);

export function logsUIReducer(state: Logs_UIState | undefined, action: Action): Logs_UIState {
	return reducer(state, action);
}
