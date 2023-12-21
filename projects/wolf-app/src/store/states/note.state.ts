import { Note, NoteContent, QueryParams, RemoteMetadata, SyncData, UUID } from "@lib";

export interface NoteModuleState {

	entities: NoteEntitiesState;
	ui: NoteUIState;

}

export interface NoteEntitiesState {

	entities: Record<UUID, Note>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

	selectedId: UUID | null;
	content: NoteContent | null;

}

export interface NoteUIState {

	queryParams: QueryParams;

}

// INITIALIZATION

export const initialNoteEntitiesState: NoteEntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {},

	selectedId: null,
	content: null

};

export const initialNoteUIState: NoteUIState = {

	queryParams: {
		id: null,
		search: null,
		tags: []
	}

};

export const initialNoteState: NoteModuleState = {

	entities: initialNoteEntitiesState,
	ui: initialNoteUIState

};
