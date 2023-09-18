import { BookmarksTable, ConfigurationTable, LocalStorageService, LogsTable, LocalTableNames, KBEntriesTable, KBContentsTable } from 'lib';
import { DexieBookmarksTableImpl, DexieConfigurationTableImpl, DexieLogsTableImpl } from './tables';
import { WolfBaseDB, wolfBaseDBFactory } from './wolfbase.database';
import { DexieKBEntriesTableImpl } from './tables/kb-entries.table';
import { DexieKBContentsTableImpl } from './tables/kb-contents.table';

export class DexieLocalStorageServiceImpl implements LocalStorageService {

	private db: WolfBaseDB;

	public bookmarks: BookmarksTable;
	kbEntries: KBEntriesTable;
	kbContents: KBContentsTable;

	public configuration: ConfigurationTable;
	public logs: LogsTable;

	constructor() {

		const db: WolfBaseDB = wolfBaseDBFactory();
		this.bookmarks = new DexieBookmarksTableImpl(db);
		this.kbEntries = new DexieKBEntriesTableImpl(db);
		this.kbContents = new DexieKBContentsTableImpl(db);
		this.configuration = new DexieConfigurationTableImpl(db);
		this.logs = new DexieLogsTableImpl(db);
		this.db = db;

	}

	async dump(tablename: LocalTableNames): Promise<Record<string, string>> {

		const table = this.db.table(tablename);
		const data = table.toCollection();
		const result: Record<string, string> = {};
		await data.each(
			(obj: any, cursor) => result[cursor.key.toString(), JSON.stringify(obj, null, '\t')]
		);
		return result;

	}

}