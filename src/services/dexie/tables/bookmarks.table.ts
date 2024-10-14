import { AppEntities, LocalRepositoryNames, LogCategory, UUID } from '@constants';
import { Bookmark, Click, SyncData } from '@models';
import { BookmarksLocalRepository } from '@repositories';
import { toggleArrayItem } from '@utils';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityLocalRepositoryImpl } from './entity.table';

export class DexieBookmarksRepositoryImpl extends EntityLocalRepositoryImpl<Bookmark> implements BookmarksLocalRepository {

	constructor(db: WolfBaseDB) {
		super(db, AppEntities.bookmark);
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
			urls: [ '' ]

		};
		return { ...instance, ...item, id } as Bookmark;

	}

	async toggleTag(id: UUID, name: string): Promise<void> {

		await this.db.transaction('rw', [
			AppEntities.bookmark.table,
			AppEntities.bookmark.table_sync
		], async () => {

			// update bookmarks table
			const count = await this.db.table(this.appEntity.table).where({ id }).modify((bookmark: Bookmark): void => {

				bookmark.tags = toggleArrayItem(bookmark.tags, name);

			});

			// update syncData
			if (count > 0)
				await this.db.table(this.appEntity.table_sync).where('id').equals(id).modify({ updated: true } as Partial<SyncData>);

		});

	}

	async click(id: UUID): Promise<void> {

		// try to increment value (update)
		const affected = await this.db.table(AppEntities.bookmark.table_clicks)
			.where({ id })
			.modify((click: Click): void => {

				click.total = (click.total ?? 0) + 1;
				click.current = (click.current ?? 0) + 1;

			});

		// if no object found, create one
		if (affected !== 1)
			await this.db.table(AppEntities.bookmark.table_clicks).add({
				id,
				total: 1,
				current: 1
			});

	}

	async getClick(id: string): Promise<Click | null> {

		return await this.db.table(AppEntities.bookmark.table_clicks).get(id) ?? null;

	}

	async listClicked(): Promise<Click[]> {

		return await this.db.table(AppEntities.bookmark.table_clicks).where('current').above(0).toArray();

	}

	async storeClick(click: Click): Promise<Click> {

		await this.db.table(AppEntities.bookmark.table_clicks).put(click);
		return click;

	}

	async storeClicks(items: Click[]): Promise<Click[]> {

		// remove obsolete click objects
		const bookmarkIds = new Set(await this.db.table(this.appEntity.table).toCollection().primaryKeys() as UUID[]);
		const matching = items.filter(({ id }) => bookmarkIds.has(id));
		await this.db.transaction('rw', [ AppEntities.bookmark.table_clicks, LocalRepositoryNames.logs ], async () => {

			await this.db.table(AppEntities.bookmark.table_clicks).clear();
			await this.db.table(AppEntities.bookmark.table_clicks).bulkAdd(matching);
			// add log
			await this.db.table(LocalRepositoryNames.logs).add({
				category: LogCategory.store_clicks,
				date: new Date().toISOString(),
				message: `${items.length} downloaded, ${matching.length} stored`
			});

		});
		return matching;

	}

	async listClicks(): Promise<Click[]> {

		return await this.db.table(AppEntities.bookmark.table_clicks).toArray();

	}

}
