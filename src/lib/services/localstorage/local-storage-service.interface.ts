import { WolfBaseTableName } from 'lib/constants/database.constant';
import { BookmarksTable, ClicksTable, ConfigurationTable, SyncDataTable, TrashcanTable } from './local-storage-table.interface';

export interface LocalStorageService {

	bookmarks: BookmarksTable;
	clicks: ClicksTable;
	configuration: ConfigurationTable;
	trashcan: TrashcanTable;
	syncData: SyncDataTable;

	drop(): Promise<void>;
	clear(tablename: WolfBaseTableName): Promise<void>;
	dump(tablename: WolfBaseTableName): Promise<Map<string, string>>;

}