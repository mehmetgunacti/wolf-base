import { AppEntityType } from '@constants';
import { Entity } from '@models';
import * as repo from '@repositories';

export interface RemoteRepositoryService {

	bookmarks: repo.BookmarksRemoteRepository;
	notes: repo.NotesRemoteRepository;
	noteContent: repo.NoteContentRemoteRepository;
	projects: repo.ProjectsRemoteRepository;
	quizEntries: repo.QuizEntriesRemoteRepository;
	quotes: repo.QuotesRemoteRepository;
	tasks: repo.TasksRemoteRepository;
	words: repo.WordsRemoteRepository;

	getRepository(entity: AppEntityType): repo.EntityRemoteRepository<Entity>;

}
