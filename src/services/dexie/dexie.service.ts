import { Entity, EntityType, LocalRepositoryNames, LocalRepositoryService } from '@lib';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, LogsLocalRepository, NoteContentLocalRepository, NotesLocalRepository, ProjectLocalRepository, QuoteLocalRepository, WordLocalRepository } from 'lib/repositories/local';
import { TaskLocalRepository } from 'lib/repositories/local/project-task.repository';
import { QuizEntryLocalRepository } from 'lib/repositories/local/quiz-entry.repository';
import { DexieBookmarksRepositoryImpl, DexieConfigurationRepositoryImpl, DexieLogsLocalRepositoryImpl, DexieQuotesRepositoryImpl } from './tables';
import { DexieNoteContentRepositoryImpl } from './tables/notes-content.table';
import { DexieNotesRepositoryImpl } from './tables/notes.table';
import { DexieTasksRepositoryImpl } from './tables/project-tasks.table';
import { DexieProjectsRepositoryImpl } from './tables/projects.table';
import { DexieQuizEntriesRepositoryImpl } from './tables/quiz-entries.table';
import { DexieWordsRepositoryImpl } from './tables/words.table';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';

export class DexieLocalRepositoryServiceImpl implements LocalRepositoryService {

	private db: WolfBaseDB;

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

		const db: WolfBaseDB = wolfBaseDBFactory();
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

	getRepository<T extends Entity>(entityType: EntityType): EntityLocalRepository<T> {

		switch (entityType) {

			case EntityType.bookmark: return this.bookmarks as unknown as EntityLocalRepository<T>;
			case EntityType.note: return this.notes as unknown as EntityLocalRepository<T>;
			case EntityType.noteContent: return this.noteContent as unknown as EntityLocalRepository<T>;
			case EntityType.project: return this.projects as unknown as EntityLocalRepository<T>;
			case EntityType.quizEntry: return this.quizEntries as unknown as EntityLocalRepository<T>;
			case EntityType.quote: return this.quotes as unknown as EntityLocalRepository<T>;
			case EntityType.task: return this.tasks as unknown as EntityLocalRepository<T>;
			case EntityType.word: return this.words as unknown as EntityLocalRepository<T>;

		}
		throw Error('Unknown entity');

	}

	async dump<T = any>(repoName: LocalRepositoryNames): Promise<Record<string, T>> {

		const Repository = this.db.table(repoName);
		const data = Repository.toCollection();
		const result: Record<string, any> = {};
		await data.each(
			(obj: any, cursor) => result[cursor.key.toString()] = obj // JSON.stringify(obj, null, '\t')
		);
		return result;

	}

	async count(repoName: LocalRepositoryNames): Promise<number> {

		return await this.db.table(repoName).count();

	}

	async size(repoName: LocalRepositoryNames): Promise<number> {

		let size = 0;
		await this.db.table(repoName).each(obj => size += JSON.stringify(obj).length);
		return size;

	}

}
