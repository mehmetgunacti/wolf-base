import { createAction, props } from '@ngrx/store';
import { KBEntry, RemoteMetadata, SyncData, UUID } from 'lib';

export const loadAllKBEntriesSuccess = createAction('[KnowledgeBase] Load All Success', props<{ entries: KBEntry[] }>());

export const createKBEntry = createAction('[KnowledgeBase] Create KB Entry', props<{ entry: Partial<KBEntry> }>());
export const createKBentrySuccess = createAction('[KnowledgeBase] Create KB Entry Success', props<{ entry: KBEntry }>());

export const updateKBEntry = createAction('[KnowledgeBase] Update KB Entry', props<{ id: UUID, entry: Partial<KBEntry> }>());
export const updateKBEntrySuccess = createAction('[KnowledgeBase] Update KB Entry Success', props<{ entry: KBEntry }>());
export const updateKBEntryFailure = createAction('[KnowledgeBase] Update KB Entry Failure', props<{ id: UUID }>());

export const deleteKBEntry = createAction('[KnowledgeBase] Delete KB Entry', props<{ id: UUID }>());
export const deleteKBEntrySuccess = createAction('[KnowledgeBase] Delete KB Entry Success');

export const loadSyncDataSuccess = createAction('[Knowledge Base] Load SyncData Success', props<{ syncData: SyncData[] }>());
export const loadRemoteMetadataSuccess = createAction('[Knowledge Base] Load RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());
export const loadTrashCountSuccess = createAction('[Knowledge Base] Load Trash Count Success', props<{ count: number }>());
