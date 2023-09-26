import { Action, createReducer, on } from '@ngrx/store';
import { loadRemoteMetadataSuccess, loadSyncDataSuccess, loadTrashCountSuccess } from 'store/actions/bookmark.actions';
import { BookmarkSyncState, initialBookmarkSyncState } from 'store/states/bookmark.state';

const reducer = createReducer(

    initialBookmarkSyncState,

    on(loadSyncDataSuccess, (state, { syncData }): BookmarkSyncState => ({ ...state, syncData })),
    on(loadRemoteMetadataSuccess, (state, { remoteMetadata }): BookmarkSyncState => ({ ...state, remoteMetadata })),
    on(loadTrashCountSuccess, (state, { count }): BookmarkSyncState => ({ ...state, trashCount: count }))

);

export function bookmarkSyncReducer(state: BookmarkSyncState | undefined, action: Action): BookmarkSyncState {
    return reducer(state, action);
}