import { UUID } from '@constants';
import { Entity, RemoteMetadata, SyncData } from '@models';

export interface Entity_ModuleState {

	bookmark: Entity_EntitiesState;
	note: Entity_EntitiesState;
	noteContent: Entity_EntitiesState;
	project: Entity_EntitiesState;
	quizEntry: Entity_EntitiesState;
	quote: Entity_EntitiesState;
	task: Entity_EntitiesState;
	word: Entity_EntitiesState;

}

export interface Entity_EntitiesState {

	entities: Record<UUID, Entity>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

// INITIALIZATION

function createInitialEntitiesState(): Entity_EntitiesState {

	return {
		entities: {},
		syncData: {},
		remoteMetadata: {}
	};

}

export const entity_initialState: Entity_ModuleState = {

	bookmark: createInitialEntitiesState(),
	note: createInitialEntitiesState(),
	noteContent: createInitialEntitiesState(),
	project: createInitialEntitiesState(),
	quizEntry: createInitialEntitiesState(),
	quote: createInitialEntitiesState(),
	task: createInitialEntitiesState(),
	word: createInitialEntitiesState()

};
