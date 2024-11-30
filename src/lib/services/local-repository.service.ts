import { DbStore } from '@constants/database.constant';
import { AppEntityType } from '@constants/entity.constant';
import { Entity } from '@models/entity.model';
import { BookmarksLocalRepository } from '@repositories/local/bookmark.repository';
import { ConfigurationLocalRepository } from '@repositories/local/configuration.repository';
import { EntityLocalRepository } from '@repositories/local/entity.repository';
import { LogsLocalRepository } from '@repositories/local/log.repository';
import { NoteContentLocalRepository } from '@repositories/local/note-content.repository';
import { NotesLocalRepository } from '@repositories/local/note.repository';
import { TaskLocalRepository } from '@repositories/local/project-task.repository';
import { ProjectLocalRepository } from '@repositories/local/project.repository';
import { QuizEntryLocalRepository } from '@repositories/local/quiz-entry.repository';
import { QuoteLocalRepository } from '@repositories/local/quote.repository';
import { TestSuiteLocalRepository } from '@repositories/local/test-suite.repository';
import { WordLocalRepository } from '@repositories/local/word.repository';

export interface LocalRepositoryService {

	// entity tables
	bookmarks: BookmarksLocalRepository;
	notes: NotesLocalRepository;
	noteContent: NoteContentLocalRepository;
	projects: ProjectLocalRepository;
	quizEntries: QuizEntryLocalRepository;
	quotes: QuoteLocalRepository;
	tasks: TaskLocalRepository;
	testSuites: TestSuiteLocalRepository;
	words: WordLocalRepository;

	// non-entity tables
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	getRepository<T extends Entity>(entityType: AppEntityType): EntityLocalRepository<T>;
	dump<T = any>(repoName: DbStore): Promise<Record<string, T>>;
	count(table: string): Promise<number>;
	size(table: string): Promise<number>;
	empty(table: string): Promise<void>;

}
