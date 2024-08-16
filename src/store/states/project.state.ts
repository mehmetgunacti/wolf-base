import { Project, ProjectQueryParams, RemoteMetadata, SyncData, UUID } from '@lib';

export interface Project_ModuleState {

	entities: Project_EntitiesState;
	ui: Project_UIState;

}

export interface Project_EntitiesState {

	entities: Record<UUID, Project>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

export interface Project_UIState {

	selectedId: UUID | null;
	queryParams: ProjectQueryParams;

}

// INITIALIZATION

export const project_initialEntitiesState: Project_EntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {}

};

export const initialProjectUIState: Project_UIState = {

	selectedId: null,
	queryParams: {
		search: null
	}

};

export const initialProjectState: Project_ModuleState = {

	entities: project_initialEntitiesState,
	ui: initialProjectUIState

};
