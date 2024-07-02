import { RemoteMetadata, SyncData, UUID, QuizProgress, Definition, NameBase } from '@lib';
import { createAction, props } from '@ngrx/store';

// CRUD
export const create							= createAction('[QuizEntry] Create', props<{ definition: Definition }>());
export const createSuccess					= createAction('[QuizEntry] Create Success', props<{ quizEntry: QuizProgress }>());

export const update							= createAction('[QuizEntry] Update', props<{ id: UUID, answeredRight: boolean }>());
export const updateSuccess					= createAction('[QuizEntry] Update Success', props<{ id: UUID }>());
export const updateFailure					= createAction('[QuizEntry] Update Failure', props<{ id: UUID }>());

export const moveToTrash					= createAction('[QuizEntry] Move to Trash', props<{ entry: NameBase }>());
export const moveToTrashSuccess				= createAction('[QuizEntry] Move to Trash Success', props<{ entry: NameBase }>());

// LOAD FROM LOCAL DATABASE INTO MEMORY
//// Entity
export const loadAll						= createAction('[QuizEntry] Load All');
export const loadAllSuccess					= createAction('[QuizEntry] Load All Success', props<{ quizEntries: QuizProgress[], syncData: SyncData[], remoteMetadata: RemoteMetadata[] }>());

export const loadOne						= createAction('[QuizEntry] Load One', props<{ id: UUID }>());
export const loadOneSuccess					= createAction('[QuizEntry] Load One Success', props<{ id: UUID, quizEntry: QuizProgress | null, syncData: SyncData | null, remoteMetadata: RemoteMetadata | null }>());

export const unloadOne						= createAction('[QuizEntry] Unload One', props<{ id: UUID }>());

// SyncData
export const loadOneSyncData				= createAction('[QuizEntry] Load One SyncData', props<{ id: UUID }>());
export const loadOneSyncDataSuccess			= createAction('[QuizEntry] Load One SyncData Success', props<{ syncData: SyncData | null }>());

//// RemoteMetadata
export const loadAllRemoteMetadata			= createAction('[QuizEntry] Load All RemoteMetadata');
export const loadAllRemoteMetadataSuccess	= createAction('[QuizEntry] Load All RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());

//// Trash Count
// export const loadTrashCount					= createAction('[QuizEntry] Load Trash Count');
// export const loadTrashCountSuccess			= createAction('[QuizEntry] Load Trash Count Success', props<{ count: number }>());

// UI
export const setNow							= createAction('[QuizEntry] Set Now');

// CLOUD SYNC
// local_new
export const syncLocalNew					= createAction('[QuizEntry] Sync Local New');

// local_updated
export const syncLocalUpdated				= createAction('[QuizEntry] Sync Local Updated');

// local_deleted
export const syncLocalDeleted				= createAction('[QuizEntry] Sync Local Deleted');

// remote_new
export const syncRemoteNew					= createAction('[QuizEntry] Sync Remote New');

// remote_updated
export const syncRemoteUpdated				= createAction('[QuizEntry] Sync Remote Updated');

// remote_deleted
export const syncRemoteDeleted				= createAction('[QuizEntry] Sync Remote Deleted');

// deleted_deleted
export const syncDeletedDeleted				= createAction('[QuizEntry] Sync Deleted Deleted');
