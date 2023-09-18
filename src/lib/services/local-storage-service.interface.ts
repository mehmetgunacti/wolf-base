import { WolfBaseTableName } from 'lib/constants/database.constant';
import { BookmarksTable, ConfigurationTable, LogsTable } from './local-storage-table.interface';

export interface LocalStorageService {

	// entity tables
	bookmarks: BookmarksTable;

	// non-entity tables
	configuration: ConfigurationTable;
	logs: LogsTable;

	dump(tablename: WolfBaseTableName): Promise<Record<string, string>>;

}