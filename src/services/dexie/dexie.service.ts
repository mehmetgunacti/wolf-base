import { WolfBaseTableName } from 'lib/constants';
import { LocalStorageService } from '../../lib/services/localstorage/local-storage-service.interface';
import { BasicTable, BookmarksTable, ConfigurationTable } from '../../lib/services/localstorage/local-storage-table.interface';
import { WolfBaseDB } from './wolfbase.database';

export class DexieLocalStorageService implements LocalStorageService {

	constructor(
		private db: WolfBaseDB,
		public bookmarks: BookmarksTable,
		public configuration: ConfigurationTable
	) { }

	getTable(tablename: WolfBaseTableName): BasicTable {

		switch (tablename) {
			case WolfBaseTableName.bookmarks: return this.bookmarks;
			case WolfBaseTableName.configuration: return this.configuration;
			// case KnobaTable.notes: return this.notes;
			// case KnobaTable.tasks: return this.tasks;
			// case KnobaTable.words: return this.words;
		}
		throw new Error('name is not of type KnobaTable : [' + name + ']');

	}

	async drop(): Promise<void> {

		await this.db.delete();

	}

	// getTable(tablename: string): LocalStorageTable<IKnobaEntity> {

	// 	switch (tablename) {
	// 		case WolfBaseTableName.bookmarks: return this.bookmarks;
	// 		// case KnobaTable.notes: return this.notes;
	// 		// case KnobaTable.tasks: return this.tasks;
	// 		// case KnobaTable.words: return this.words;
	// 	}
	// 	throw new Error('name is not of type KnobaTable : [' + name + ']');

	// }

}
