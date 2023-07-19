import { Action, createReducer, on } from '@ngrx/store';
import { BookmarkActions } from 'store/actions';
import { BookmarkSyncState, initialBookmarkSyncState } from 'store/states/bookmark.state';

const reducer = createReducer(

    initialBookmarkSyncState,

    on(BookmarkActions.Sync.syncSuccess, (state, { syncData }): BookmarkSyncState => ({ ...state, syncData })),
    on(BookmarkActions.Sync.trashCountSuccess, (state, { count }): BookmarkSyncState => ({ ...state, trashCount: count }))

);

export function bookmarkSyncReducer(state: BookmarkSyncState | undefined, action: Action): BookmarkSyncState {
    return reducer(state, action);
}