import { WolfBaseTableName } from '../../../constants/database.constant';
import { LocalStorageService } from '../local-storage-service.interface';
import { BookmarksTable, ClicksTable, ConfigurationTable } from '../local-storage-table.interface';
import { WolfBaseDB } from './wolfbase.database';

export class DexieLocalStorageService implements LocalStorageService {

	constructor(
		private db: WolfBaseDB,
		public bookmarks: BookmarksTable,
		public configuration: ConfigurationTable,
		public clicks: ClicksTable
	) { }

	async drop(): Promise<void> {

		await this.db.delete();

	}

	async clear(tablename: WolfBaseTableName): Promise<void> {

		await this.db.table(tablename).clear();

	}

	async dump(tablename: WolfBaseTableName): Promise<Map<string, string>> {

		const table = this.db.table(tablename);
		const data = table.toCollection();
		const result: Map<string, string> = new Map();
		await data.each(
			(obj: any, cursor) => result.set(cursor.key.toString(), JSON.stringify(obj, null, '\t'))
		);
		return result;

	}

}
