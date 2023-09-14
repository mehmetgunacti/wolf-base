import { Action, createReducer, on } from '@ngrx/store';
import { loadLogsSuccess, setSelectedCategory } from "store/actions/logs.actions";
import { LogsEntriesState, initialLogsEntriesState } from "store/states/logs.state";

const reducer = createReducer(

    initialLogsEntriesState,
    on(loadLogsSuccess, (state, { logs }): LogsEntriesState => ({ ...state, logs: [...logs] })),
    on(setSelectedCategory, (state, { category }): LogsEntriesState => ({ ...state, selectedCategory: category }))

);

export function logsEntriesReducer(state: LogsEntriesState | undefined, action: Action): LogsEntriesState {
    return reducer(state, action);
}
