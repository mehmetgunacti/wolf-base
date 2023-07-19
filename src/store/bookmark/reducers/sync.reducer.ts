import { Action, createReducer, on } from '@ngrx/store';
import { BookmarkActions } from 'store/actions';
import * as fromStates from '../states';

const reducer = createReducer(

    fromStates.syncInitialState,

    on(BookmarkActions.Sync.syncSuccess, (state, { syncData }): fromStates.SyncState => ({ ...state, syncData })),
    on(BookmarkActions.Sync.trashCountSuccess, (state, { count }): fromStates.SyncState => ({ ...state, trashCount: count }))

);

export function syncReducer(state: fromStates.SyncState | undefined, action: Action): fromStates.SyncState {
    return reducer(state, action);
}