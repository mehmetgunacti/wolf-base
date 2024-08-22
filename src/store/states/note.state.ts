import { Note, NoteQueryParams, RemoteMetadata, SyncData, UUID } from '@lib';

export interface Note_ModuleState {

	entities: Note_EntitiesState;
	ui: Note_UIState;

}

export interface Note_EntitiesState {

	entities: Record<UUID, Note>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

export interface Note_UIState {

	selectedId: UUID | null;
	queryParams: NoteQueryParams;

}

// INITIALIZATION

export const note_initialEntitiesState: Note_EntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {},

};

export const initialNoteUIState: Note_UIState = {

	selectedId: null,
	queryParams: {
		search: null,
		tags: []
	}

};

export const initialNoteState: Note_ModuleState = {

	entities: note_initialEntitiesState,
	ui: initialNoteUIState

};
