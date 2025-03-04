import { DbStore } from '@constants/database.constant';
import { AppEntityType } from '@constants/entity.constant';
import { Entity } from '@models/entity.model';
import { BookmarksLocalRepository } from '@repositories/local/bookmark.repository';
import { ConfigurationLocalRepository } from '@repositories/local/configuration.repository';
import { EntityLocalRepository } from '@repositories/local/entity.repository';
import { ExamsLocalRepository } from '@repositories/local/exam.repository';
import { LogsLocalRepository } from '@repositories/local/log.repository';
import { NoteContentLocalRepository } from '@repositories/local/note-content.repository';
import { NotesLocalRepository } from '@repositories/local/note.repository';
import { TasksLocalRepository } from '@repositories/local/project-task.repository';
import { ProjectsLocalRepository } from '@repositories/local/project.repository';
import { QuizEntriesLocalRepository } from '@repositories/local/quiz-entry.repository';
import { QuotesLocalRepository } from '@repositories/local/quote.repository';
import { SessionsLocalRepository } from '@repositories/local/session.repository';
import { TestSuitesLocalRepository } from '@repositories/local/test-suite.repository';
import { WordsLocalRepository } from '@repositories/local/word.repository';

export interface LocalRepositoryService {

	// entity tables
	bookmarks: BookmarksLocalRepository;
	exams: ExamsLocalRepository;
	notes: NotesLocalRepository;
	noteContent: NoteContentLocalRepository;
	projects: ProjectsLocalRepository;
	quizEntries: QuizEntriesLocalRepository;
	quotes: QuotesLocalRepository;
	sessions: SessionsLocalRepository;
	tasks: TasksLocalRepository;
	testSuites: TestSuitesLocalRepository;
	words: WordsLocalRepository;

	// non-entity tables
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	getRepository<T extends Entity>(entityType: AppEntityType): EntityLocalRepository<T>;
	dump<T = any>(repoName: DbStore): Promise<Record<string, T>>;
	count(table: string): Promise<number>;
	size(table: string): Promise<number>;
	empty(table: string): Promise<void>;

}
