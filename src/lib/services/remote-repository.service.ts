import { AppEntityType } from '@constants/entity.constant';
import { Entity } from '@models/entity.model';
import { BookmarksRemoteRepository } from '@repositories/remote/bookmark-remote.repository';
import { EntityRemoteRepository } from '@repositories/remote/entity-remote.repository';
import { NoteContentRemoteRepository } from '@repositories/remote/note-content-remote.repository';
import { NotesRemoteRepository } from '@repositories/remote/note-remote.repository';
import { ProjectsRemoteRepository } from '@repositories/remote/project-remote.repository';
import { TasksRemoteRepository } from '@repositories/remote/project-task-remote.repository';
import { QuizEntriesRemoteRepository } from '@repositories/remote/quiz-entry-remote.repository';
import { QuotesRemoteRepository } from '@repositories/remote/quote-remote.repository';
import { WordsRemoteRepository } from '@repositories/remote/word-remote.repository';

export interface RemoteRepositoryService {

	bookmarks: BookmarksRemoteRepository;
	notes: NotesRemoteRepository;
	noteContent: NoteContentRemoteRepository;
	projects: ProjectsRemoteRepository;
	quizEntries: QuizEntriesRemoteRepository;
	quotes: QuotesRemoteRepository;
	tasks: TasksRemoteRepository;
	words: WordsRemoteRepository;

	getRepository(entity: AppEntityType): EntityRemoteRepository<Entity>;

}
