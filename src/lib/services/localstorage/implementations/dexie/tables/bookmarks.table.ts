import { WolfBaseTable, ID } from 'lib/constants';
import { Click, Bookmark, ISyncData } from 'lib/models';
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
		return {

			...instance,
			...item

		} as Bookmark;

	}


	protected searchFilter(term: string, item: ISyncData<Bookmark>): boolean {

		return new RegExp(term.toLocaleLowerCase()).test(
			(`${item.data.name} ${item.data.title} ${item.data.tags}`).toLocaleLowerCase()
		);

	}

	async getClickedItems(): Promise<Click[]> {

		const items: ISyncData<Bookmark>[] = await this.db.bookmarks
			.filter((item: ISyncData<Bookmark>) => !!item.updates.clicks)
			.toArray();

		return items.map(item => ({
			id: item.id,
			clicks: item.updates?.clicks || 0
		}));

	}

	async saveClick(item: Click): Promise<void> {

		await this.db.bookmarks
			.where({ id: item.id })
			.modify((sd: ISyncData<Bookmark>): void => {

				sd.data.clicks = item.clicks;
				const { clicks, ...rest } = { ...sd.updates };
				sd.updates = rest;

			});

	}

	async saveClicks(items: Click[]): Promise<void> {

		for (const item of items)
			await this.saveClick(item);

	}

	async click(id: string): Promise<void> {

		await this.db.bookmarks
			.where({ id })
			.modify((sd: ISyncData<Bookmark>): void => { // .modify((item: IBookmark, ref: { value: IBookmark, primKey: IndexableType }): void => {

				sd.data.clicks = (sd.data.clicks || 0) + 1;
				sd.updates.clicks = (sd.updates.clicks || 0) + 1;

			});
	}

}
