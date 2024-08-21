import { AppEntityType, LocalRepositoryNames } from 'lib/constants';
import { Entity } from 'lib/models';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, LogsLocalRepository, NoteContentLocalRepository, ProjectLocalRepository, QuoteLocalRepository } from 'lib/repositories/local';
import { NotesLocalRepository } from 'lib/repositories/local/note.repository';
import { TaskLocalRepository } from 'lib/repositories/local/project-task.repository';
import { QuizEntryLocalRepository } from 'lib/repositories/local/quiz-entry.repository';
import { WordLocalRepository } from 'lib/repositories/local/word.repository';

export interface LocalRepositoryService {

	// entity tables
	bookmarks: BookmarksLocalRepository;
	notes: NotesLocalRepository;
	noteContent: NoteContentLocalRepository;
	projects: ProjectLocalRepository;
	quizEntries: QuizEntryLocalRepository;
	quotes: QuoteLocalRepository;
	tasks: TaskLocalRepository;
	words: WordLocalRepository;

	// non-entity tables
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	getRepository<T extends Entity>(entityType: AppEntityType): EntityLocalRepository<T>;
	dump<T = any>(repoName: LocalRepositoryNames): Promise<Record<string, T>>;
	count(table: string): Promise<number>;
	size(table: string): Promise<number>;

}
