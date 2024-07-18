import { WolfEntity } from 'lib/constants';
import { Entity } from 'lib/models';
import { BookmarksRemoteRepository, EntityRemoteRepository, NoteContentRemoteRepository, NotesRemoteRepository, ProjectsRemoteRepository, QuizEntriesRemoteRepository, QuotesRemoteRepository } from 'lib/repositories/remote';
import { WordsRemoteRepository } from 'lib/repositories/remote/word-remote.repository';

export interface RemoteRepositoryService {

	bookmarks: BookmarksRemoteRepository;
	notes: NotesRemoteRepository;
	noteContent: NoteContentRemoteRepository;
	projects: ProjectsRemoteRepository;
	quizEntries: QuizEntriesRemoteRepository;
	quotes: QuotesRemoteRepository;
	words: WordsRemoteRepository;

	getRepository(entity: WolfEntity): EntityRemoteRepository<Entity>;

}
