import { Bookmark, Entity, Note, NoteContent, Project, QuizProgress, Quote, RemoteMetadata, SyncData, Task, UUID, Word } from '@lib';

export interface Entity_ModuleState {

	bookmark: Entity_EntitiesState<Bookmark>;
	note: Entity_EntitiesState<Note>;
	noteContent: Entity_EntitiesState<NoteContent>;
	project: Entity_EntitiesState<Project>;
	quizEntry: Entity_EntitiesState<QuizProgress>;
	quote: Entity_EntitiesState<Quote>;
	task: Entity_EntitiesState<Task>;
	word: Entity_EntitiesState<Word>;

}

export interface Entity_EntitiesState<T extends Entity> {

	entities: Record<UUID, T>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;

}

// INITIALIZATION

function createInitialEntitiesState<T extends Entity>(): Entity_EntitiesState<T> {

	return {
		entities: {},
		syncData: {},
		remoteMetadata: {}
	};

}

export const entity_initialState: Entity_ModuleState = {

	bookmark: createInitialEntitiesState<Bookmark>(),
	note: createInitialEntitiesState<Note>(),
	noteContent: createInitialEntitiesState<NoteContent>(),
	project: createInitialEntitiesState<Project>(),
	quizEntry: createInitialEntitiesState<QuizProgress>(),
	quote: createInitialEntitiesState<Quote>(),
	task: createInitialEntitiesState<Task>(),
	word: createInitialEntitiesState<Word>()

};
