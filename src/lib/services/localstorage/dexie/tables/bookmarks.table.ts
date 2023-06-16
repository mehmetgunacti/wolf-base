import { toggleArrayItem } from 'lib';
import { UUID } from 'lib/constants/common.constant';
import { WolfBaseTableName } from 'lib/constants/database.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { BookmarksTable } from 'lib/services/localstorage/local-storage-table.interface';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityTableImpl } from './entity.table';

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

	async toggleTag(id: UUID, name: string): Promise<void> {

		await this.db.bookmarks
			.where({ id })
			.modify((bookmark: Bookmark): void => {

				bookmark.tags = toggleArrayItem(bookmark.tags, name);

			});

	}

}