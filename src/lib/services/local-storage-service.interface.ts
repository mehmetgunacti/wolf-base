import { LocalTableNames } from 'lib/constants/database.constant';
import { BookmarksTable, ConfigurationTable, KBContentsTable, KBEntriesTable, LogsTable } from './local-storage-table.interface';

export interface LocalStorageService {

	// entity tables
	bookmarks: BookmarksTable;
	kbEntries: KBEntriesTable;
	kbContents: KBContentsTable;

	// non-entity tables
	configuration: ConfigurationTable;
	logs: LogsTable;

	dump(tablename: LocalTableNames): Promise<Record<string, string>>;

}