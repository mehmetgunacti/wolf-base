import { Quote, RemoteMetadata, SyncData, UUID } from '@lib';

export interface Quote_ModuleState {

	entities: Quote_EntitiesState;

}

export interface Quote_EntitiesState {

	entities: Record<UUID, Quote>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

// INITIALIZATION

export const quote_initialEntitiesState: Quote_EntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {}

};

export const quote_initialModuleState: Quote_ModuleState = {

	entities: quote_initialEntitiesState

};
