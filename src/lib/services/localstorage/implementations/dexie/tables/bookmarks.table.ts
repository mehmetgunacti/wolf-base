import { KnobaTable, ID } from 'blueprints/constants';
import { IClick, IBookmark, ISyncData } from 'blueprints/models';
import { AbstractDexieTable } from '../dexie.table';
import { KnobaDB } from '../knoba.database';
import { IBookmarksTable } from 'blueprints/services/localstorage/local-storage-table.interface';

export class BookmarksTable extends AbstractDexieTable<IBookmark> implements IBookmarksTable {

	constructor(
		db: KnobaDB
	) {
		super(db, KnobaTable.bookmarks);
	}

	protected newInstance(id: ID, item: Partial<IBookmark>): IBookmark {

		const instance: IBookmark = {

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

		} as IBookmark;

	}


	protected searchFilter(term: string, item: ISyncData<IBookmark>): boolean {

		return new RegExp(term.toLocaleLowerCase()).test(
			(`${item.data.name} ${item.data.title} ${item.data.tags}`).toLocaleLowerCase()
		);

	}

	async getClickedItems(): Promise<IClick[]> {

		const items: ISyncData<IBookmark>[] = await this.db.bookmarks
			.filter(item => !!item.updates.clicks)
			.toArray();

		return items.map(item => ({
			id: item.id,
			clicks: item.updates?.clicks || 0
		}));

	}

	async saveClick(item: IClick): Promise<void> {

		await this.db.bookmarks
			.where({ id: item.id })
			.modify((sd: ISyncData<IBookmark>): void => {

				sd.data.clicks = item.clicks;
				const { clicks, ...rest } = { ...sd.updates };
				sd.updates = rest;

			});

	}

	async saveClicks(items: IClick[]): Promise<void> {

		for (const item of items)
			await this.saveClick(item);

	}

	async click(id: string): Promise<void> {

		await this.db.bookmarks
			.where({ id })
			.modify((sd: ISyncData<IBookmark>): void => { // .modify((item: IBookmark, ref: { value: IBookmark, primKey: IndexableType }): void => {

				sd.data.clicks = (sd.data.clicks || 0) + 1;
				sd.updates.clicks = (sd.updates.clicks || 0) + 1;

			});
	}

}
