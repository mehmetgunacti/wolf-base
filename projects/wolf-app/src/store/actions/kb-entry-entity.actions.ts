import { createAction, props } from '@ngrx/store';
import { KBEntry, RemoteMetadata, SyncData, UUID } from 'lib';

export const loadAllEntitiesSuccess		= createAction('[KB Entry] Load All Entities Success', props<{ entries: KBEntry[] }>());

export const createEntity				= createAction('[KB Entry] Create Entity', props<{ kbEntry: Partial<KBEntry> }>());
export const createEntitySuccess		= createAction('[KB Entry] Create Entity Success', props<{ kbEntry: KBEntry }>());

export const updateEntity				= createAction('[KB Entry] Update Entity', props<{ id: UUID, kbEntry: Partial<KBEntry> }>());
export const updateEntitySuccess		= createAction('[KB Entry] Update Entity Success', props<{ kbEntry: KBEntry }>());
export const updateEntityFailure		= createAction('[KB Entry] Update Entity Failure', props<{ id: UUID }>());

export const deleteEntity				= createAction('[KB Entry] Delete Entity', props<{ id: UUID }>());
export const deleteEntitySuccess		= createAction('[KB Entry] Delete Entity Success');

export const loadSyncDataSuccess		= createAction('[KB Entry] Load SyncData Success', props<{ syncData: SyncData[] }>());
export const loadRemoteMetadataSuccess	= createAction('[KB Entry] Load RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());
export const loadTrashCountSuccess		= createAction('[KB Entry] Load Trash Count Success', props<{ count: number }>());

export const setSelected				= createAction('[KB Entry] Set Selected', props<{ id: UUID }>());
export const removeSelected				= createAction('[KB Entry] Remove Selected');
