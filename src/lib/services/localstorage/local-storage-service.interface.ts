import { WolfBaseTableName } from 'lib/constants';
import { BasicTable, BookmarksTable, ConfigurationTable } from './local-storage-table.interface';

export interface LocalStorageService {

	bookmarks: BookmarksTable;
	configuration: ConfigurationTable;

	drop(): Promise<void>;
	getTable(tablename: WolfBaseTableName): BasicTable;

}