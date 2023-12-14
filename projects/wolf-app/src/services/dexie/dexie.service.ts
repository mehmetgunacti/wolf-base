import { Entity, EntityName, LocalRepositoryNames, LocalRepositoryService, WolfEntity } from '@lib';
import { BookmarksLocalRepository, ConfigurationLocalRepository, EntityLocalRepository, KBContentsLocalRepository, KBEntriesLocalRepository, LogsLocalRepository, NotesLocalRepository } from 'lib/repositories/local';
import { DexieBookmarksRepositoryImpl, DexieConfigurationRepositoryImpl, DexieLogsLocalRepositoryImpl } from './tables';
import { DexieKBContentsRepositoryImpl } from './tables/kb-contents.table';
import { DexieKBEntriesRepositoryImpl } from './tables/kb-entries.table';
import { DexieNotesRepositoryImpl } from './tables/notes.table';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';

export class DexieLocalRepositoryServiceImpl implements LocalRepositoryService {

	private db: WolfBaseDB;

	bookmarks: BookmarksLocalRepository;
	notes: NotesLocalRepository;
	kbEntries: KBEntriesLocalRepository;
	kbContents: KBContentsLocalRepository;
	configuration: ConfigurationLocalRepository;
	logs: LogsLocalRepository;

	constructor() {

		const db: WolfBaseDB = wolfBaseDBFactory();
		this.bookmarks = new DexieBookmarksRepositoryImpl(db);
		this.notes = new DexieNotesRepositoryImpl(db);
		this.kbEntries = new DexieKBEntriesRepositoryImpl(db);
		this.kbContents = new DexieKBContentsRepositoryImpl(db);
		this.configuration = new DexieConfigurationRepositoryImpl(db);
		this.logs = new DexieLogsLocalRepositoryImpl(db);
		this.db = db;

	}

	getRepository<T extends Entity>(entityName: EntityName): EntityLocalRepository<T> {

		switch (entityName.name) {

			case WolfEntity.bookmark.name: return this.bookmarks as unknown as EntityLocalRepository<T>;
			case WolfEntity.note.name: return this.notes as unknown as EntityLocalRepository<T>;

		}
		throw Error('Unknown entity');

	}

	private async dump(repositoryname: LocalRepositoryNames): Promise<Record<string, string>> {

		const Repository = this.db.table(repositoryname);
		const data = Repository.toCollection();
		const result: Record<string, string> = {};
		await data.each(
			(obj: any, cursor) => result[cursor.key.toString()] = JSON.stringify(obj, null, '\t')
		);
		return result;

	}

}
