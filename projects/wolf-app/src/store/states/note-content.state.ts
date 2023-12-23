import { NoteContent, RemoteMetadata, SyncData, UUID } from '@lib';

export interface NoteContent_ModuleState {

	entities: NoteContent_EntitiesState;

}

export interface NoteContent_EntitiesState {

	ids: Record<UUID, boolean>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

	content: NoteContent | null;

}

// INITIALIZATION

export const noteContent_initialEntitiesState: NoteContent_EntitiesState = {

	ids: {},
	syncData: {},
	remoteMetadata: {},

	content: null

};

export const noteContent_initialState: NoteContent_ModuleState = {

	entities: noteContent_initialEntitiesState

};
