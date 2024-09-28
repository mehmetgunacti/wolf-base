import { Action, createReducer, on } from '@ngrx/store';
import { logActions } from "store/actions/logs.actions";
import { Logs_EntriesState, initialLogsEntriesState } from "store/states/logs.state";

const reducer = createReducer(

	initialLogsEntriesState,
	on(logActions.loadSuccess, (state, { logs }): Logs_EntriesState => ({ ...state, logs: [...logs] }))

);

export function logsEntriesReducer(state: Logs_EntriesState | undefined, action: Action): Logs_EntriesState {
	return reducer(state, action);
}
