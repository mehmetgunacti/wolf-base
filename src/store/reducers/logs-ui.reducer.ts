import { Action, createReducer, on } from '@ngrx/store';
import { LogsUIState, initialLogsUIState } from "store/states/logs.state";

const reducer = createReducer(

    initialLogsUIState,
    // on(toggleFilterPane, (state): LogsUIState => ({ ...state, filterPaneVisible: !state.filterPaneVisible }))

);

export function logsUIReducer(state: LogsUIState | undefined, action: Action): LogsUIState {
    return reducer(state, action);
}
