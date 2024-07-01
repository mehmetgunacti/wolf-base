import { QuizEntry, RemoteMetadata, SyncData, UUID } from '@lib';

export interface QuizEntry_ModuleState {

	entities: QuizEntry_EntitiesState;

}

export interface QuizEntry_EntitiesState {

	entities: Record<UUID, QuizEntry>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

// INITIALIZATION

export const quizEntry_initialEntitiesState: QuizEntry_EntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {}

};

export const quizEntry_initialModuleState: QuizEntry_ModuleState = {

	entities: quizEntry_initialEntitiesState

};
