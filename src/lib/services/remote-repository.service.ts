import { EntityType } from 'lib/constants';
import { Entity } from 'lib/models';
import { BookmarksRemoteRepository, EntityRemoteRepository, NoteContentRemoteRepository, NotesRemoteRepository, ProjectsRemoteRepository, QuizEntriesRemoteRepository, QuotesRemoteRepository } from 'lib/repositories/remote';
import { TasksRemoteRepository } from 'lib/repositories/remote/project-task-remote.repository';
import { WordsRemoteRepository } from 'lib/repositories/remote/word-remote.repository';

export interface RemoteRepositoryService {

	bookmarks: BookmarksRemoteRepository;
	notes: NotesRemoteRepository;
	noteContent: NoteContentRemoteRepository;
	projects: ProjectsRemoteRepository;
	quizEntries: QuizEntriesRemoteRepository;
	quotes: QuotesRemoteRepository;
	tasks: TasksRemoteRepository;
	words: WordsRemoteRepository;

	getRepository(entity: EntityType): EntityRemoteRepository<Entity>;

}
