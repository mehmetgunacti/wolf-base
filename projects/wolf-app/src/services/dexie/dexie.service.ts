import { Entity, LocalRepositoryNames, LocalRepositoryService, WolfEntity } from '@lib';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, KBContentsLocalRepository, KBEntriesLocalRepository, LogsLocalRepository } from 'lib/repositories/local';
import { DexieBookmarksRepositoryImpl, DexieConfigurationRepositoryImpl, DexieLogsLocalRepositoryImpl } from './tables';
import { DexieKBContentsRepositoryImpl } from './tables/kb-contents.table';
import { DexieKBEntriesRepositoryImpl } from './tables/kb-entries.table';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';

export class DexieLocalRepositoryServiceImpl implements LocalRepositoryService {

	private db: WolfBaseDB;

	bookmarks: BookmarksLocalRepository;
	kbEntries: KBEntriesLocalRepository;
	kbContents: KBContentsLocalRepository;
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	constructor() {

		const db: WolfBaseDB = wolfBaseDBFactory();
		this.bookmarks = new DexieBookmarksRepositoryImpl(db);
		this.kbEntries = new DexieKBEntriesRepositoryImpl(db);
		this.kbContents = new DexieKBContentsRepositoryImpl(db);
		this.configuration = new DexieConfigurationRepositoryImpl(db);
		this.logs = new DexieLogsLocalRepositoryImpl(db);
		this.db = db;

	}

	getRepository(entity: WolfEntity): EntityLocalRepository<Entity> {

		switch (entity) {

			case WolfEntity.bookmarks: return this.bookmarks;

		}
		throw Error('Unknown entity');

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
