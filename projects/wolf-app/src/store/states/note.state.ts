import { Note, RemoteMetadata, SyncData, UUID } from "@lib";

export interface NoteModuleState {

	entities: NoteEntitiesState;
	ui: NoteUIState;
	tags: NoteTagsState;

}

// todo move some properties to ui state
export interface NoteEntitiesState {

	entities: Record<UUID, Note>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

	selected: UUID | null;

}

export interface NoteTagsState {

	selectedTags: string[];
	searchTerm: string | null;

}

export interface NoteUIState {
}

// INITIALIZATION

export const initialNoteEntitiesState: NoteEntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {},
	selected: null

};

export const initialNoteTagsState: NoteTagsState = {

	selectedTags: [],
	searchTerm: null

};

export const initialNoteUIState: NoteUIState = {
};

export const initialNoteState: NoteModuleState = {

	entities: initialNoteEntitiesState,
	ui: initialNoteUIState,
	tags: initialNoteTagsState

};
