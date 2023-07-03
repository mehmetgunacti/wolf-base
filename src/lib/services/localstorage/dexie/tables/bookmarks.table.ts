import { Metadata, RemoteData, SyncData, isNewer, toggleArrayItem } from 'lib';
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

}

export class MockBookmarksTableImpl implements BookmarksTable {

	private bookmarks: Map<string, Bookmark> = new Map();
	private bookmarks_sync: Map<string, SyncData> = new Map();
	private bookmarks_trash: Map<string, Bookmark> = new Map();

	get(id: string): Promise<Bookmark | undefined> {

		return Promise.resolve(this.bookmarks.get(id));

	}

	create(item: Partial<Bookmark>): Promise<Bookmark> {

		const bookmark: Bookmark = {

			name: '',
			title: '',
			tags: [],
			image: '',
			urls: [''],
			clicks: 0,
			...item,
			id: uuidv4()

		};
		this.bookmarks.set(bookmark.id, bookmark);
		return Promise.resolve(bookmark);

	}

	put(item: RemoteData<Bookmark>): Promise<void> {

		const syncData: SyncData = {

			id: item.metaData.id,
			createTime: item.metaData.createTime,
			updateTime: item.metaData.updateTime,
			updated: false,
			deleted: false,
			error: null

		}

		this.bookmarks.set(item.metaData.id, item.entity);
		this.bookmarks_sync.set(item.metaData.id, syncData);
		return Promise.resolve();

	}

	update(id: string, item: Partial<Bookmark>): Promise<Bookmark> {

		const bookmark: Bookmark | undefined = this.bookmarks.get(id);
		const sync: SyncData | undefined = this.bookmarks_sync.get(id);
		if (!bookmark || !sync)
			throw new Error(`Bookmark or syncData with ID '${id}' not found.`);

		const updated: Bookmark = {

			...bookmark,
			...item

		};
		const updatedSync: SyncData = {

			...sync,
			updated: true

		}
		this.bookmarks.set(id, updated);
		this.bookmarks_sync.set(id, updatedSync);
		return Promise.resolve(bookmark);

	}

	markError(id: string, error: string): Promise<void> {

		const syncData: SyncData | undefined = this.bookmarks_sync.get(id);
		if (!syncData)
			throw new Error(`Bookmark syncData with ID '${id}' not found.`);

		syncData.error = error;
		return Promise.resolve();

	}

	list(): Promise<Bookmark[]> {

		return Promise.resolve(
			Array.from(this.bookmarks.values())
		);

	}

	listIds(): Promise<string[]> {

		return Promise.resolve(
			Array.from(this.bookmarks.keys())
		);

	}

	getSyncData(id: string): Promise<SyncData | null> {

		const syncData: SyncData | undefined = this.bookmarks_sync.get(id);
		return Promise.resolve(syncData || null);

	}

	listSyncData(): Promise<SyncData[]> {

		return Promise.resolve(
			Array.from(this.bookmarks_sync.values())
		);

	}

	listNewIds(): Promise<string[]> {

		const bookmarkIds = Array.from(this.bookmarks.keys());
		const syncIds = Array.from(this.bookmarks_sync.keys());
		return Promise.resolve(
			bookmarkIds.filter((key) => !syncIds.includes(key))
		);

	}

	listErrors(): Promise<SyncData[]> {

		return Promise.resolve(
			Array.from(this.bookmarks_sync.values()).filter(s => !!s.error)
		);

	}

	listUpdated(): Promise<SyncData[]> {

		return Promise.resolve(
			Array.from(this.bookmarks_sync.values()).filter(s => s.updated)
		);

	}

	moveToTrash(id: string): Promise<void> {

		const bookmark: Bookmark | undefined = this.bookmarks.get(id);
		if (bookmark) {

			this.bookmarks_trash.set(id, bookmark);
			this.bookmarks.delete(id);
			const sync: SyncData | undefined = this.bookmarks_sync.get(id);
			if (sync)
				sync.deleted = true;

		}
		return Promise.resolve();

	}

	listDeletedItems(): Promise<Bookmark[]> {

		return Promise.resolve(
			Array.from(this.bookmarks_trash.values())
		);

	}

	deletePermanently(id: string): Promise<void> {

		this.bookmarks_trash.delete(id);
		return Promise.resolve();

	}

	filterNew(entities: Metadata[]): Promise<Metadata[]> {

		const local: SyncData[] = Array.from(this.bookmarks_sync.values());
		const localIds: Set<UUID> = new Set(local.map(s => s.id));
		return Promise.resolve(
			entities.filter(e => !localIds.has(e.id))
		);

	}

	filterUpdated(entities: Metadata[]): Promise<Metadata[]> {

		const localMetaData = Array.from(this.bookmarks_sync.values());
		if (localMetaData.length === 0)
			return Promise.resolve([]);

		const mapLocalMetaData = new Map(localMetaData.map(e => [e.id, e]));
		const updated = entities.filter(r => {

			const localEntity = mapLocalMetaData.get(r.id);
			if (!localEntity) // if remote item not in local sync table -> skip
				return false;
			return isNewer(r.updateTime, localEntity.updateTime)

		});
		return Promise.resolve(updated);

	}

	filterDeleted(entities: Metadata[]): Promise<SyncData[]> {

		const set: Set<UUID> = new Set(entities.map(e => e.id));
		const localIds: SyncData[] = Array.from(this.bookmarks_sync.values());
		return Promise.resolve(
			localIds.filter(entity => !set.has(entity.id))
		);

	}

	search(term: string): Promise<Bookmark[]> {
		throw new Error('Method not implemented.');
	}

	searchByTags(tags: string[]): Promise<Bookmark[]> {

		throw new Error('Method not implemented.');

	}

	toggleTag(id: string, name: string): Promise<void> {

		const bookmark: Bookmark | undefined = this.bookmarks.get(id);
		if (bookmark)
			bookmark.tags = toggleArrayItem(bookmark.tags, name);
		return Promise.resolve();

	}

}