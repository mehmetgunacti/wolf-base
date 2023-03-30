import { WolfBaseTable, ID } from 'lib/constants';
import { Click, Bookmark } from 'lib/models';
import { AbstractDexieTable } from '../dexie.table';
import { WolfBaseDB } from '../wolfbase.database';
import { IBookmarksTable } from 'lib/services/localstorage/local-storage-table.interface';

export class BookmarksTable extends AbstractDexieTable<Bookmark> implements IBookmarksTable {

	constructor(
		db: WolfBaseDB
	) {
		super(db, WolfBaseTable.bookmarks);
	}

	protected newInstance(id: ID, item: Partial<Bookmark>): Bookmark {

		const instance: Bookmark = {

			id,
			name: '',
			title: '',
			tags: [],
			image: '',
			url: '',
			clicks: 0

		};
		return { ...instance, ...item, id } as Bookmark;

	}


	protected searchFilter(term: string, item: Bookmark): boolean {

		return new RegExp(term.toLocaleLowerCase()).test(
			(`${item.name} ${item.title} ${item.tags}`).toLocaleLowerCase()
		);

	}

	async listClickedItems(): Promise<Click[]> {

		// todo: does not check outgoing clicks
		const items: Bookmark[] = await this.db.bookmarks
			.filter((item: Bookmark) => !!item.clicks)
			.toArray();

		return items.map(item => ({
			id: item.id,
			clicks: item.clicks || 0
		}));

	}

	async saveClick(item: Click): Promise<void> {

		// todo
		await this.db.bookmarks
			.where({ id: item.id })
			.modify((bookmark: Bookmark): void => {

				bookmark.clicks = item.clicks;

				// remove 'clicks' from 'outgoing'
				// if (!!bookmark.syncData?.outgoing?.clicks) {

				// 	const { clicks, ...rest } = { ...bookmark.syncData.outgoing };
				// 	bookmark.syncData.outgoing = rest;

				// }

			});

	}

	async saveClicks(items: Click[]): Promise<void> {

		for (const item of items)
			await this.saveClick(item);

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
