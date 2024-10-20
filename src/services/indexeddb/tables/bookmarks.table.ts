import { AppEntities, DbStore, LogCategory } from '@constants';
import { IndexedDb } from '@libServices';
import { LogMessage, SyncData } from '@models';
import { toggleArrayItem } from '@utils';
import { UUID } from 'lib/constants/common.constant';
import { Bookmark, Click } from 'lib/models/bookmark.model';
import { BookmarksLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';
import { EntityLocalRepositoryImpl } from './entity.table';

export class BookmarksLocalRepositoryImpl extends EntityLocalRepositoryImpl<Bookmark> implements BookmarksLocalRepository {

	constructor(db: IndexedDb) {
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

		await this.db.transaction('readwrite', [
			DbStore.bookmarks,
			DbStore.bookmarks_sync
		], async tx => {

			const entity = await tx.read<Bookmark>(DbStore.bookmarks, id);
			if (entity) {

				const updated = { ...entity, tags: toggleArrayItem(entity.tags, name) };
				await tx.put(DbStore.bookmarks, updated);
				await tx.modify(DbStore.bookmarks_sync, id, { updated: true } as Partial<SyncData>);

			}

		});

	}

	async click(id: UUID): Promise<void> {

		await this.db.transaction('readwrite', [ DbStore.bookmarks_clicks ], async tx => {

			const click: Click | null = await tx.read<Click>(DbStore.bookmarks_clicks, id);
			if (click) {

				const updated: Click = {
					...click,
					total: (click.total ?? 0) + 1,
					current: (click.current ?? 0) + 1
				};
				await tx.put(DbStore.bookmarks_clicks, updated);

			} else {

				await tx.put(DbStore.bookmarks_clicks, {
					id,
					total: 1,
					current: 1
				});

			}

		});

	}

	async getClick(id: string): Promise<Click | null> {

		return await this.db.read<Click>(DbStore.bookmarks_clicks, id);

	}

	async listClicks(): Promise<Click[]> {

		return await this.db.readAll<Click>(DbStore.bookmarks_clicks);

	}

	async listClicked(): Promise<Click[]> {

		const list = await this.listClicks();
		return list.filter(click => click.current > 0);

	}

	async storeClick(click: Click): Promise<Click> {

		await this.db.put(DbStore.bookmarks_clicks, click);
		return click;

	}

	async storeClicks(items: Click[]): Promise<Click[]> {

		return await this.db.transaction(
			'readwrite',
			[ DbStore.bookmarks, DbStore.bookmarks_clicks, DbStore.logs ],
			async tx => {

				// remove obsolete click objects
				const bookmarkIds = new Set(await tx.readAllKeys(DbStore.bookmarks));
				const matching = items.filter(({ id }) => bookmarkIds.has(id));

				await tx.empty(DbStore.bookmarks_clicks);
				await tx.bulkPut(DbStore.bookmarks_clicks, matching);

				// add log
				await tx.add<LogMessage>(DbStore.logs, {
					category: LogCategory.store_clicks,
					date: new Date().toISOString(),
					message: `${items.length} downloaded, ${matching.length} stored`
				});
				return matching;

			}
		);

	}

}
