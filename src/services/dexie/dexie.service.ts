import { WolfBaseTableName } from 'lib/constants';
import { LocalStorageService } from '../../lib/services/localstorage/local-storage-service.interface';
import { BookmarksTable, ConfigurationTable } from '../../lib/services/localstorage/local-storage-table.interface';
import { WolfBaseDB } from './wolfbase.database';

export class DexieLocalStorageService implements LocalStorageService {

	constructor(
		private db: WolfBaseDB,
		public bookmarks: BookmarksTable,
		public configuration: ConfigurationTable
	) { }

	async drop(): Promise<void> {

		await this.db.delete();

	}

	async clear(tablename: WolfBaseTableName): Promise<void> {

		await this.db.table(tablename).clear();

	}

	async dump<T>(tablename: WolfBaseTableName): Promise<Record<string, T>> {

		const table = this.db.table(tablename);
		const data = table.toCollection();
		const result: Record<string, T> = {};
		await data.each(
			(obj: T, cursor) => result[cursor.key.toString()] = obj
		);
		return result;

	}

}
