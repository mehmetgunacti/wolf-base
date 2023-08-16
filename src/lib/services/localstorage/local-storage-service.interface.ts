import { WolfBaseTableName } from 'lib/constants/database.constant';
import { BookmarksTable, ClicksTable, ConfigurationTable, SyncLogsTable } from './local-storage-table.interface';

export interface LocalStorageService {

	// entity tables
	bookmarks: BookmarksTable;

	// non-entity tables
	clicks: ClicksTable;
	configuration: ConfigurationTable;
	syncLog: SyncLogsTable;

	drop(): Promise<void>;
	clear(tablename: WolfBaseTableName): Promise<void>;
	dump(tablename: WolfBaseTableName): Promise<Map<string, string>>;

}