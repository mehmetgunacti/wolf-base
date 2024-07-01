import { Entity, EntityName, LocalRepositoryNames, LocalRepositoryService, WolfEntity } from '@lib';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, LogsLocalRepository, NoteContentLocalRepository, NotesLocalRepository, QuoteLocalRepository, WordLocalRepository } from 'lib/repositories/local';
import { DexieBookmarksRepositoryImpl, DexieConfigurationRepositoryImpl, DexieLogsLocalRepositoryImpl, DexieQuotesRepositoryImpl } from './tables';
import { DexieNoteContentRepositoryImpl } from './tables/notes-content.table';
import { DexieNotesRepositoryImpl } from './tables/notes.table';
import { DexieWordsRepositoryImpl } from './tables/words.table';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';
import { QuizEntryLocalRepository } from 'lib/repositories/local/quiz-entry.repository';
import { DexieQuizEntriesRepositoryImpl } from './tables/quiz-entries.table';

export class DexieLocalRepositoryServiceImpl implements LocalRepositoryService {

	private db: WolfBaseDB;

	bookmarks: BookmarksLocalRepository;
	notes: NotesLocalRepository;
	noteContent: NoteContentLocalRepository;
	words: WordLocalRepository;
	quizEntries: QuizEntryLocalRepository;
	quotes: QuoteLocalRepository;
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	constructor() {

		const db: WolfBaseDB = wolfBaseDBFactory();
		this.bookmarks = new DexieBookmarksRepositoryImpl(db);
		this.notes = new DexieNotesRepositoryImpl(db);
		this.noteContent = new DexieNoteContentRepositoryImpl(db);
		this.words = new DexieWordsRepositoryImpl(db);
		this.quizEntries = new DexieQuizEntriesRepositoryImpl(db);
		this.quotes = new DexieQuotesRepositoryImpl(db);
		this.configuration = new DexieConfigurationRepositoryImpl(db);
		this.logs = new DexieLogsLocalRepositoryImpl(db);
		this.db = db;

	}

	getRepository<T extends Entity>(entityName: EntityName): EntityLocalRepository<T> {

		switch (entityName.name) {

			case WolfEntity.bookmark.name: return this.bookmarks as unknown as EntityLocalRepository<T>;
			case WolfEntity.note.name: return this.notes as unknown as EntityLocalRepository<T>;
			case WolfEntity.note_content.name: return this.noteContent as unknown as EntityLocalRepository<T>;
			case WolfEntity.word.name: return this.words as unknown as EntityLocalRepository<T>;
			case WolfEntity.quote.name: return this.quotes as unknown as EntityLocalRepository<T>;
			case WolfEntity.quizEntry.name: return this.quizEntries as unknown as EntityLocalRepository<T>;

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
