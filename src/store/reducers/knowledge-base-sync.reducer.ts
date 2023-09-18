import { Action, createReducer, on } from '@ngrx/store';
import { loadRemoteMetadataSuccess, loadSyncDataSuccess, loadTrashCountSuccess } from 'store/actions/knowledge-base.actions';
import { KnowledgeBaseSyncState, initialKnowledgeBaseSyncState } from 'store/states/knowledge-base.state';

const reducer = createReducer(

    initialKnowledgeBaseSyncState,

    on(loadSyncDataSuccess, (state, { syncData }): KnowledgeBaseSyncState => ({ ...state, syncData })),
    on(loadRemoteMetadataSuccess, (state, { remoteMetadata }): KnowledgeBaseSyncState => ({ ...state, remoteMetadata })),
    on(loadTrashCountSuccess, (state, { count }): KnowledgeBaseSyncState => ({ ...state, trashCount: count }))

);

export function knowledgeBaseSyncReducer(state: KnowledgeBaseSyncState | undefined, action: Action): KnowledgeBaseSyncState {
    return reducer(state, action);
}