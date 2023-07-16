import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromStates from '../states';

const reducer = createReducer(

    fromStates.syncInitialState,

    on(fromActions.bookmarksSyncSuccess, (state, { syncData }): fromStates.SyncState => ({ ...state, syncData })),
    on(fromActions.bookmarksTrashCountSuccess, (state, { count }): fromStates.SyncState => ({ ...state, trashCount: count }))

);

export function syncReducer(state: fromStates.SyncState | undefined, action: Action): fromStates.SyncState {
    return reducer(state, action);
}