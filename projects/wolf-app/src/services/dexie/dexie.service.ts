import { BookmarksRepository, ConfigurationRepository, KBContentsRepository, KBEntriesRepository, LocalRepositoryNames, LocalStorageService, LogsRepository } from '@lib';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';
import { DexieBookmarksRepositoryImpl, DexieConfigurationRepositoryImpl, DexieLogsRepositoryImpl } from './tables';
import { DexieKBEntriesRepositoryImpl } from './tables/kb-entries.table';
import { DexieKBContentsRepositoryImpl } from './tables/kb-contents.table';

export class DexieLocalStorageServiceImpl implements LocalStorageService {

	private db: WolfBaseDB;

	bookmarks: BookmarksRepository;
	kbEntries: KBEntriesRepository;
	kbContents: KBContentsRepository;
	configuration: ConfigurationRepository;
	logs: LogsRepository;

	constructor() {

		const db: WolfBaseDB = wolfBaseDBFactory();
		this.bookmarks = new DexieBookmarksRepositoryImpl(db);
		this.kbEntries = new DexieKBEntriesRepositoryImpl(db);
		this.kbContents = new DexieKBContentsRepositoryImpl(db);
		this.configuration = new DexieConfigurationRepositoryImpl(db);
		this.logs = new DexieLogsRepositoryImpl(db);
		this.db = db;

	}

	async dump(repositoryname: LocalRepositoryNames): Promise<Record<string, string>> {

		const Repository = this.db.table(repositoryname);
		const data = Repository.toCollection();
		const result: Record<string, string> = {};
		await data.each(
			(obj: any, cursor) => result[cursor.key.toString()] = JSON.stringify(obj, null, '\t')
		);
		return result;

	}

}
