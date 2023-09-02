import { WolfBaseTableName } from 'lib/constants/database.constant';
import { BookmarksTable, ClicksTable, ConfigurationTable, LogsTable } from './local-storage-table.interface';

export interface LocalStorageService {

	// entity tables
	bookmarks: BookmarksTable;

	// non-entity tables
	clicks: ClicksTable;
	configuration: ConfigurationTable;
	logs: LogsTable;

	dump(tablename: WolfBaseTableName): Promise<Record<string, string>>;

}