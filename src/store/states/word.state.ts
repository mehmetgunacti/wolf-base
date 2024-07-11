import { Word, RemoteMetadata, SyncData, UUID, WordQueryParams } from '@lib';

export interface Word_ModuleState {

	entities: Word_EntitiesState;
	ui: Word_UIState;

}

export interface Word_EntitiesState {

	entities: Record<UUID, Word>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

export interface Word_UIState {

	selectedId: UUID | null;
	queryParams: WordQueryParams;

}

// INITIALIZATION

export const word_initialEntitiesState: Word_EntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {}

};

export const initialWordUIState: Word_UIState = {

	selectedId: null,
	queryParams: {
		search: null
	}

};

export const initialWordState: Word_ModuleState = {

	entities: word_initialEntitiesState,
	ui: initialWordUIState

};
