import { Action, createReducer, on } from '@ngrx/store';
import { syncSuccess, trashCountSuccess } from 'store/actions/bookmark-sync.actions';
import { BookmarkSyncState, initialBookmarkSyncState } from 'store/states/bookmark.state';

const reducer = createReducer(

    initialBookmarkSyncState,

    on(syncSuccess, (state, { syncData }): BookmarkSyncState => ({ ...state, syncData })),
    on(trashCountSuccess, (state, { count }): BookmarkSyncState => ({ ...state, trashCount: count }))

);

export function bookmarkSyncReducer(state: BookmarkSyncState | undefined, action: Action): BookmarkSyncState {
    return reducer(state, action);
}