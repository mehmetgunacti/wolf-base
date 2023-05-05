import { WolfBaseTableName } from 'lib/constants';
import { BookmarksTable, ConfigurationTable } from './local-storage-table.interface';

export interface LocalStorageService {

	bookmarks: BookmarksTable;
	configuration: ConfigurationTable;

	drop(): Promise<void>;
	clear(tablename: WolfBaseTableName): Promise<void>;
	dump<T>(tablename: WolfBaseTableName): Promise<Record<string, T>>;

}