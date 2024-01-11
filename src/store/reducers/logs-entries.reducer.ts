import { Action, createReducer, on } from '@ngrx/store';
import { loadSuccess } from "store/actions/logs.actions";
import { Logs_EntriesState, initialLogsEntriesState } from "store/states/logs.state";

const reducer = createReducer(

    initialLogsEntriesState,
    on(loadSuccess, (state, { logs }): Logs_EntriesState => ({ ...state, logs: [...logs] }))

);

export function logsEntriesReducer(state: Logs_EntriesState | undefined, action: Action): Logs_EntriesState {
    return reducer(state, action);
}
