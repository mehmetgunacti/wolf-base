import { UUID, WolfBaseTableName } from 'lib/constants';
import { Bookmark } from 'lib/models';
import { BookmarksTable } from 'lib/services/localstorage/local-storage-table.interface';
import { v4 as uuidv4 } from 'uuid';
import { EntityTableImpl } from './entity.table';
import { WolfBaseDB } from '../wolfbase.database';

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
			url: [''],
			clicks: 0

		};
		return { ...instance, ...item, id } as Bookmark;

	}

	async click(id: string): Promise<void> {

		await this.db.bookmarks
			.where({ id })
			.modify((bookmark: Bookmark): void => { // .modify((item: IBookmark, ref: { value: IBookmark, primKey: IndexableType }): void => {

				bookmark.clicks = (bookmark.clicks ?? 0) + 1;

				// todo
				// add # of clicks to 'outgoing' / increase
				// bookmark.syncData = bookmark.syncData ?? {};
				// bookmark.syncData.outgoing = bookmark.syncData.outgoing ?? {};
				// bookmark.syncData.outgoing.clicks = (bookmark.syncData.outgoing.clicks ?? 0) + 1;

			});
	}

}