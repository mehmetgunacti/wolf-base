import { LocalStorageService } from '../../local-storage-service.interface';
import { BookmarksTableInterface, ConfigurationTableInterface } from '../../local-storage-table.interface';
import { WolfBaseDB } from './wolfbase.database';

export class DexieLocalStorageService extends LocalStorageService {

	constructor(
		private db: WolfBaseDB,
		public override bookmarks: BookmarksTableInterface,
		public override configuration: ConfigurationTableInterface
	) {
		super(
			bookmarks,
			configuration
		);
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
