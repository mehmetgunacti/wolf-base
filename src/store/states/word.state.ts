import { Word, RemoteMetadata, SyncData, UUID } from '@lib';

export interface Word_ModuleState {

	entities: Word_EntitiesState;
	ui: Word_UIState;

}

export interface Word_EntitiesState {

	entities: Record<UUID, Word>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

	selectedId: UUID | null;

}

export interface Word_UIState {}

// INITIALIZATION

export const word_initialEntitiesState: Word_EntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {},

	selectedId: null

};

export const initialWordUIState: Word_UIState = {

	queryParams: {
		search: null,
		tags: []
	}

};

export const initialWordState: Word_ModuleState = {

	entities: word_initialEntitiesState,
	ui: initialWordUIState

};
