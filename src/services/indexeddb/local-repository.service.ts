import { AppEntityType, TStore } from '@constants';
import { LocalRepositoryService } from '@libServices';
import { Entity } from '@models';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, LogsLocalRepository, NoteContentLocalRepository, NotesLocalRepository, ProjectLocalRepository, QuoteLocalRepository, WordLocalRepository } from 'lib/repositories/local';
import { TaskLocalRepository } from 'lib/repositories/local/project-task.repository';
import { QuizEntryLocalRepository } from 'lib/repositories/local/quiz-entry.repository';
import { IndexedDb } from './indexeddb.service';
import { DexieBookmarksRepositoryImpl, DexieConfigurationRepositoryImpl, DexieLogsLocalRepositoryImpl, DexieQuotesRepositoryImpl } from './tables';
import { DexieNoteContentRepositoryImpl } from './tables/notes-content.table';
import { DexieNotesRepositoryImpl } from './tables/notes.table';
import { DexieTasksRepositoryImpl } from './tables/project-tasks.table';
import { DexieProjectsRepositoryImpl } from './tables/projects.table';
import { DexieQuizEntriesRepositoryImpl } from './tables/quiz-entries.table';
import { DexieWordsRepositoryImpl } from './tables/words.table';

export class IndexedDbLocalRepositoryServiceImpl implements LocalRepositoryService {

	private db: IndexedDb;

	bookmarks: BookmarksLocalRepository;
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;
	notes: NotesLocalRepository;
	noteContent: NoteContentLocalRepository;
	projects: ProjectLocalRepository;
	quizEntries: QuizEntryLocalRepository;
	quotes: QuoteLocalRepository;
	tasks: TaskLocalRepository;
	words: WordLocalRepository;

	constructor() {

		const db: IndexedDb = new IndexedDb();
		this.bookmarks = new DexieBookmarksRepositoryImpl(db);
		this.configuration = new DexieConfigurationRepositoryImpl(db);
		this.logs = new DexieLogsLocalRepositoryImpl(db);
		this.notes = new DexieNotesRepositoryImpl(db);
		this.noteContent = new DexieNoteContentRepositoryImpl(db);
		this.projects = new DexieProjectsRepositoryImpl(db);
		this.quizEntries = new DexieQuizEntriesRepositoryImpl(db);
		this.quotes = new DexieQuotesRepositoryImpl(db);
		this.tasks = new DexieTasksRepositoryImpl(db);
		this.words = new DexieWordsRepositoryImpl(db);
		this.db = db;

	}

	getRepository<T extends Entity>(entityType: AppEntityType): EntityLocalRepository<T> {

		switch (entityType) {

			case AppEntityType.bookmark: return this.bookmarks as unknown as EntityLocalRepository<T>;
			case AppEntityType.note: return this.notes as unknown as EntityLocalRepository<T>;
			case AppEntityType.noteContent: return this.noteContent as unknown as EntityLocalRepository<T>;
			case AppEntityType.project: return this.projects as unknown as EntityLocalRepository<T>;
			case AppEntityType.quizEntry: return this.quizEntries as unknown as EntityLocalRepository<T>;
			case AppEntityType.quote: return this.quotes as unknown as EntityLocalRepository<T>;
			case AppEntityType.task: return this.tasks as unknown as EntityLocalRepository<T>;
			case AppEntityType.word: return this.words as unknown as EntityLocalRepository<T>;

		}
		throw Error('Unknown entity');

	}

	async dump<T = any>(repoName: TStore): Promise<Record<string, T>> {

		return await this.db.dump('bookmarks');

	}

	async count(repoName: TStore): Promise<number> {

		return await this.db.count(repoName);

	}

	async size(store: TStore): Promise<number> {

		return await this.db.size(store);

	}

	async empty(table: TStore): Promise<void> {

		await this.db.empty(table);

	}

}
