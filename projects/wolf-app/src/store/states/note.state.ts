import { Note, QueryParams, RemoteMetadata, SyncData, UUID } from '@lib';

export interface Note_ModuleState {

	entities: Note_EntitiesState;
	ui: Note_UIState;

}

export interface Note_EntitiesState {

	entities: Record<UUID, Note>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

	selectedId: UUID | null;

}

export interface Note_UIState {

	queryParams: QueryParams;

}

// INITIALIZATION

export const note_initialEntitiesState: Note_EntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {},

	selectedId: null

};

export const initialNoteUIState: Note_UIState = {

	queryParams: {
		id: null,
		search: null,
		tags: []
	}

};

export const initialNoteState: Note_ModuleState = {

	entities: note_initialEntitiesState,
	ui: initialNoteUIState

};
