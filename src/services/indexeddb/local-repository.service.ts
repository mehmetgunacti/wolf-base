import { DbStore } from '@constants/database.constant';
import { AppEntityType } from '@constants/entity.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { LocalRepositoryService } from '@libServices/local-repository.service';
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
import { LocalDatabase } from './indexeddb.service';
import { BookmarksLocalRepositoryImpl } from './tables/bookmarks.table';
import { ConfigurationLocalRepositoryImpl } from './tables/configuration.table';
import { ExamsLocalRepositoryImpl } from './tables/exams.table';
import { LogsLocalRepositoryImpl } from './tables/logs.table';
import { NoteContentLocalRepositoryImpl } from './tables/notes-content.table';
import { NotesLocalRepositoryImpl } from './tables/notes.table';
import { TasksLocalRepositoryImpl } from './tables/tasks.table';
import { ProjectsLocalRepositoryImpl } from './tables/projects.table';
import { QuizEntriesLocalRepositoryImpl } from './tables/quiz-entries.table';
import { QuotesLocalRepositoryImpl } from './tables/quotes.table';
import { SessionsLocalRepositoryImpl } from './tables/sessions.table';
import { TestSuitesLocalRepositoryImpl } from './tables/test-suites.table';
import { WordsLocalRepositoryImpl } from './tables/words.table';

export class IndexedDbLocalRepositoryServiceImpl implements LocalRepositoryService {

	private db: IndexedDb;

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

	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	constructor() {

		const db: IndexedDb = LocalDatabase.getInstance();
		this.bookmarks = new BookmarksLocalRepositoryImpl(db);
		this.exams = new ExamsLocalRepositoryImpl(db);
		this.configuration = new ConfigurationLocalRepositoryImpl(db);
		this.logs = new LogsLocalRepositoryImpl(db);
		this.notes = new NotesLocalRepositoryImpl(db);
		this.noteContent = new NoteContentLocalRepositoryImpl(db);
		this.projects = new ProjectsLocalRepositoryImpl(db);
		this.quizEntries = new QuizEntriesLocalRepositoryImpl(db);
		this.quotes = new QuotesLocalRepositoryImpl(db);
		this.sessions = new SessionsLocalRepositoryImpl(db);
		this.tasks = new TasksLocalRepositoryImpl(db);
		this.testSuites = new TestSuitesLocalRepositoryImpl(db);
		this.words = new WordsLocalRepositoryImpl(db);
		this.db = db;

	}

	getRepository<T extends Entity>(entityType: AppEntityType): EntityLocalRepository<T> {

		switch (entityType) {

			case AppEntityType.bookmark: return this.bookmarks as unknown as EntityLocalRepository<T>;
			case AppEntityType.exam: return this.exams as unknown as EntityLocalRepository<T>;
			case AppEntityType.note: return this.notes as unknown as EntityLocalRepository<T>;
			case AppEntityType.noteContent: return this.noteContent as unknown as EntityLocalRepository<T>;
			case AppEntityType.project: return this.projects as unknown as EntityLocalRepository<T>;
			case AppEntityType.quizEntry: return this.quizEntries as unknown as EntityLocalRepository<T>;
			case AppEntityType.quote: return this.quotes as unknown as EntityLocalRepository<T>;
			case AppEntityType.session: return this.sessions as unknown as EntityLocalRepository<T>;
			case AppEntityType.task: return this.tasks as unknown as EntityLocalRepository<T>;
			case AppEntityType.testSuite: return this.testSuites as unknown as EntityLocalRepository<T>;
			case AppEntityType.word: return this.words as unknown as EntityLocalRepository<T>;

		}
		throw Error('Unknown entity');

	}

	async dump<T = any>(repoName: DbStore): Promise<Record<string, T>> {

		return await this.db.dump(repoName);

	}

	async count(repoName: DbStore): Promise<number> {

		return await this.db.count(repoName);

	}

	async size(store: DbStore): Promise<number> {

		return await this.db.size(store);

	}

	async empty(table: DbStore): Promise<void> {

		await this.db.empty(table);

	}

}
