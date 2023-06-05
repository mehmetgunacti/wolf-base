import { UUID, WolfBaseTableName } from 'lib/constants';
import { Bookmark } from 'lib/models';
import { BookmarksTable } from 'lib/services/localstorage/local-storage-table.interface';
import { v4 as uuidv4 } from 'uuid';
import { EntityTableImpl } from './entity.table';
import { WolfBaseDB } from '../wolfbase.database';
import { toggleArrayItem } from 'utils';

export class BookmarksTableImpl extends EntityTableImpl<Bookmark> implements BookmarksTable {

	constructor(db: WolfBaseDB) {
		super(db, WolfBaseTableName.bookmarks);
	}

	protected override newItemFromPartial(item: Partial<Bookmark>): Bookmark {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected override newInstance(id: UUID, item: Partial<Bookmark>): Bookmark {

		const instance: Bookmark = {

			id,
			name: '',
			title: '',
			tags: [],
			image: '',
			urls: [''],
			clicks: 0,
			created: new Date().toISOString()

		};
		return { ...instance, ...item, id } as Bookmark;

	}

	async click(id: string): Promise<void> {

		await this.db.bookmarks
			.where({ id })
			.modify((bookmark: Bookmark): void => {

				bookmark.clicks = (bookmark.clicks ?? 0) + 1;

				// add # of clicks to 'sync' / increase
				if (bookmark.sync) // newly created bookmarks don't have a 'sync' object, only downloaded ones do
					bookmark.sync.clicks = (bookmark.sync.clicks ?? 0) + 1;

			});

	}

	async toggleTag(id: UUID, name: string): Promise<void> {

		await this.db.bookmarks
			.where({ id })
			.modify((bookmark: Bookmark): void => {

				bookmark.tags = toggleArrayItem(bookmark.tags, name);

			});

	}

	async syncableItems(): Promise<Bookmark[]> {

		return await this.db.bookmarks.filter(b => !b.sync || (b.sync.clicks ?? 0) > 0 || !b.sync.data).toArray();

	}

}