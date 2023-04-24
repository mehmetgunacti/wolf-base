import { IDBase } from 'lib/models/id-base.model';
import { BasicTable, BookmarksTable, ConfigurationTable } from './local-storage-table.interface';
import { WolfBaseTableName } from 'lib/constants';

export interface LocalStorageService {

	bookmarks: BookmarksTable;
	configuration: ConfigurationTable;

	drop(): Promise<void>;
	getTable(tablename: WolfBaseTableName): BasicTable<IDBase | string>;

}