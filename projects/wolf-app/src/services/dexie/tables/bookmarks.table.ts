import { BookmarksTable, LogCategory, WolfEntity, toggleArrayItem } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { Bookmark, Click } from 'lib/models/bookmark.model';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityTableImpl } from './entity.table';

export class DexieBookmarksTableImpl extends EntityTableImpl<Bookmark> implements BookmarksTable {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.bookmarks);
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
			clicks: 0

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

	async click(id: UUID): Promise<void> {

		// try to increment value (update)
		const affected = await this.db.bookmarks_clicks
			.where({ id })
			.modify((click: Click): void => {

				click.total = (click.total ?? 0) + 1;
				click.current = (click.current ?? 0) + 1;

			});

		// if no object found, create one
		if (affected !== 1)
			await this.db.bookmarks_clicks.add({
				id,
				name: id,
				total: 1,
				current: 1
			});

	}

	async listClicked(): Promise<Click[]> {

		return await this.db.bookmarks_clicks.where('current').above(0).toArray();

	}

	async storeClicks(items: Click[]): Promise<number> {

		// remove obsolete click objects
		const bookmarkIds = new Set(await this.db.bookmarks.toCollection().primaryKeys() as UUID[]);
		const matching = items.filter(({ id }) => bookmarkIds.has(id));
		await this.db.transaction('rw', [this.db.bookmarks_clicks, this.db.logs], async () => {

			await this.db.bookmarks_clicks.clear();
			await this.db.bookmarks_clicks.bulkAdd(matching);

			// add log
			await this.db.logs.add({
				category: LogCategory.store_clicks,
				date: new Date().toISOString(),
				message: `${items.length} downloaded, ${matching.length} stored`
			});

		});
		return items.length;

	}

	async listClicks(): Promise<Click[]> {

		return await this.db.bookmarks_clicks.toArray();

	}

}
