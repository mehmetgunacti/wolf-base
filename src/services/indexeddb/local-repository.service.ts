import { AppEntityType, DbStore } from '@constants';
import { IndexedDb, LocalRepositoryService } from '@libServices';
import { Entity } from '@models';
import * as repo from '@repositories';
import { LocalDatabase } from './indexeddb.service';
import * as table from './tables';


export class IndexedDbLocalRepositoryServiceImpl implements LocalRepositoryService {

	private db: IndexedDb;

	bookmarks: repo.BookmarksLocalRepository;
	configuration: repo.ConfigurationLocalRepository;
	logs: repo.LogsLocalRepository;
	notes: repo.NotesLocalRepository;
	noteContent: repo.NoteContentLocalRepository;
	projects: repo.ProjectLocalRepository;
	quizEntries: repo.QuizEntryLocalRepository;
	quotes: repo.QuoteLocalRepository;
	tasks: repo.TaskLocalRepository;
	words: repo.WordLocalRepository;

	constructor() {

		const db: IndexedDb = LocalDatabase.getInstance();
		this.bookmarks = new table.BookmarksLocalRepositoryImpl(db);
		this.configuration = new table.ConfigurationLocalRepositoryImpl(db);
		this.logs = new table.LogsLocalRepositoryImpl(db);
		this.notes = new table.NotesLocalRepositoryImpl(db);
		this.noteContent = new table.NoteContentLocalRepositoryImpl(db);
		this.projects = new table.ProjectsLocalRepositoryImpl(db);
		this.quizEntries = new table.QuizEntriesLocalRepositoryImpl(db);
		this.quotes = new table.QuotesLocalRepositoryImpl(db);
		this.tasks = new table.TasksLocalRepositoryImpl(db);
		this.words = new table.WordsLocalRepositoryImpl(db);
		this.db = db;

	}

	getRepository<T extends Entity>(entityType: AppEntityType): repo.EntityLocalRepository<T> {

		switch (entityType) {

			case AppEntityType.bookmark: return this.bookmarks as unknown as repo.EntityLocalRepository<T>;
			case AppEntityType.note: return this.notes as unknown as repo.EntityLocalRepository<T>;
			case AppEntityType.noteContent: return this.noteContent as unknown as repo.EntityLocalRepository<T>;
			case AppEntityType.project: return this.projects as unknown as repo.EntityLocalRepository<T>;
			case AppEntityType.quizEntry: return this.quizEntries as unknown as repo.EntityLocalRepository<T>;
			case AppEntityType.quote: return this.quotes as unknown as repo.EntityLocalRepository<T>;
			case AppEntityType.task: return this.tasks as unknown as repo.EntityLocalRepository<T>;
			case AppEntityType.word: return this.words as unknown as repo.EntityLocalRepository<T>;

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
