import { UUID } from '@constants/common.constant';
import { Entity } from '@models/entity.model';
import { RemoteMetadata } from '@models/remote.model';
import { SyncData } from '@models/sync.model';

export interface Entity_ModuleState {

	bookmark: Entity_EntitiesState;
	exam: Entity_EntitiesState;
	note: Entity_EntitiesState;
	noteContent: Entity_EntitiesState;
	project: Entity_EntitiesState;
	quizEntry: Entity_EntitiesState;
	quote: Entity_EntitiesState;
	session: Entity_EntitiesState;
	task: Entity_EntitiesState;
	testSuite: Entity_EntitiesState;
	word: Entity_EntitiesState;

}

export interface Entity_EntitiesState {

	uuids: Record<UUID, boolean>;
	entities: Record<UUID, Entity>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

// INITIALIZATION

function createInitialEntitiesState(): Entity_EntitiesState {

	return {
		uuids: {},
		entities: {},
		syncData: {},
		remoteMetadata: {}
	};

}

export const entity_initialState: Entity_ModuleState = {

	bookmark: createInitialEntitiesState(),
	note: createInitialEntitiesState(),
	exam: createInitialEntitiesState(),
	noteContent: createInitialEntitiesState(),
	project: createInitialEntitiesState(),
	quizEntry: createInitialEntitiesState(),
	quote: createInitialEntitiesState(),
	session: createInitialEntitiesState(),
	task: createInitialEntitiesState(),
	testSuite: createInitialEntitiesState(),
	word: createInitialEntitiesState()

};
