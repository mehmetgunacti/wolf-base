import { WolfBaseTable, IKnobaEntity } from 'lib/constants';
import { LocalStorageService } from '../../local-storage-service.interface';
import { WolfBaseDB } from './wolfbase.database';
import { IBookmarksTable, ILocalStorageTable } from '../../local-storage-table.interface';

export class DexieLocalStorageService extends LocalStorageService {

	constructor(
		private db: WolfBaseDB,
		public override bookmarks: IBookmarksTable
	) {
		super(
			bookmarks
		);
	}


	async drop(): Promise<void> {

		await this.db.delete();

	}

	getTable(tablename: string): ILocalStorageTable<IKnobaEntity> {

		switch (tablename) {
			case WolfBaseTable.bookmarks: return this.bookmarks;
			// case KnobaTable.notes: return this.notes;
			// case KnobaTable.tasks: return this.tasks;
			// case KnobaTable.words: return this.words;
		}
		throw new Error('name is not of type KnobaTable : [' + name + ']');

	}

}
