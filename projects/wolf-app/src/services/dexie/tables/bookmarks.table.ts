import { LocalRepositoryNames, LogCategory, SyncData, WolfEntity, toggleArrayItem } from '@lib';
import { UUID } from 'lib/constants/common.constant';
import { Bookmark, Click } from 'lib/models/bookmark.model';
import { BookmarksLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieBookmarksRepositoryImpl extends EntityLocalRepositoryImpl<Bookmark> implements BookmarksLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, WolfEntity.bookmark);
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
			urls: ['']

		};
		return { ...instance, ...item, id } as Bookmark;

	}

	async toggleTag(id: UUID, name: string): Promise<void> {

		await this.db.transaction('rw', [
			LocalRepositoryNames.bookmarks,
			LocalRepositoryNames.bookmarks_sync
		], async () => {

			// update bookmarks table
			const count = await this.db.bookmarks.where({ id }).modify((bookmark: Bookmark): void => {

				bookmark.tags = toggleArrayItem(bookmark.tags, name);

			});

			// update syncData
			if (count > 0)
				await this.db.table<SyncData>(LocalRepositoryNames.bookmarks_sync).where('id').equals(id).modify({ updated: true } as Partial<SyncData>);

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
				total: 1,
				current: 1
			});

	}

	async getClick(id: string): Promise<Click | null> {

		return await this.db.bookmarks_clicks.get(id) ?? null;

	}

	async listClicked(): Promise<Click[]> {

		return await this.db.bookmarks_clicks.where('current').above(0).toArray();

	}

	async storeClick(click: Click): Promise<Click> {

		await this.db.bookmarks_clicks.put(click);
		return click;

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
