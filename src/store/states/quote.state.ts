import { Quote, RemoteMetadata, SyncData, UUID } from '@lib';

export interface Quote_ModuleState {

	entities: Quote_EntitiesState;
	viewer: Quote_ViewerState;
	settings: Quote_SettingsState;

}

export interface Quote_EntitiesState {

	entities: Record<UUID, Quote>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

export interface Quote_ViewerState {

	selectedId: UUID | null;
	running: boolean;

}

export interface Quote_SettingsState {

	selectedId: UUID | null;

}

// INITIALIZATION

export const quote_initialEntitiesState: Quote_EntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {}

};

export const quote_initialViewerState: Quote_ViewerState = {

	selectedId: null,
	running: false

};

export const quote_initialSettingsState: Quote_SettingsState = {

	selectedId: null

};

export const quote_initialModuleState: Quote_ModuleState = {

	entities: quote_initialEntitiesState,
	viewer: quote_initialViewerState,
	settings: quote_initialSettingsState

};
