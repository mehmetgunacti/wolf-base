import { Task, RemoteMetadata, SyncData, UUID } from '@lib';

export interface Task_ModuleState {

	entities: Task_EntitiesState;
	ui: Task_UIState;

}

export interface Task_EntitiesState {

	entities: Record<UUID, Task>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

export interface Task_UIState {

	selectedId: UUID | null;
	taskGroupId: UUID | null;

}

// INITIALIZATION

export const task_initialEntitiesState: Task_EntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {}

};

export const initialTaskUIState: Task_UIState = {

	selectedId: null,
	taskGroupId: null

};

export const initialTaskState: Task_ModuleState = {

	entities: task_initialEntitiesState,
	ui: initialTaskUIState

};
