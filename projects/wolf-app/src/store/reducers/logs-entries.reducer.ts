import { Action, createReducer, on } from '@ngrx/store';
import { loadLogsSuccess } from "store/actions/logs.actions";
import { LogsEntriesState, initialLogsEntriesState } from "store/states/logs.state";

const reducer = createReducer(

    initialLogsEntriesState,
    on(loadLogsSuccess, (state, { logs }): LogsEntriesState => ({ ...state, logs: [...logs] }))

);

export function logsEntriesReducer(state: LogsEntriesState | undefined, action: Action): LogsEntriesState {
    return reducer(state, action);
}
