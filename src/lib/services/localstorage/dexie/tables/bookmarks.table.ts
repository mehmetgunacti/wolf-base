import { Metadata, RemoteData, RemoteMetadata, SyncData, isNewer, sleep, toggleArrayItem } from 'lib';
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

const SLEEP = 20;

export class MockBookmarksTableImpl implements BookmarksTable {

	private bookmarks: Map<string, Bookmark> = new Map();
	private bookmarks_sync: Map<string, SyncData> = new Map();
	private bookmarks_remote: Map<string, RemoteMetadata> = new Map();
	private bookmarks_trash: Map<string, Bookmark> = new Map();

	async get(id: string): Promise<Bookmark | null> {

		await sleep(SLEEP);
		return this.bookmarks.get(id) ?? null;

	}

	async create(item: Partial<Bookmark>): Promise<Bookmark> {

		await sleep(SLEEP);
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
		return bookmark;

	}

	async put(item: RemoteData<Bookmark>): Promise<void> {

		await sleep(SLEEP);
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

	}

	async putAll(items: RemoteData<Bookmark>[]): Promise<void> {

		await sleep(SLEEP);
		items.forEach(item => this.put(item));

	}

	async update(id: string, item: Partial<Bookmark>): Promise<number> {

		await sleep(SLEEP);
		const bookmark: Bookmark | undefined = this.bookmarks.get(id);
		if (!bookmark)
			return 0;

		this.bookmarks.set(id, { ...bookmark, ...item });

		const sync: SyncData | undefined = this.bookmarks_sync.get(id);
		if (sync)
			this.bookmarks_sync.set(id, { ...sync, updated: true });

		return 1;

	}

	async markError(id: string, error: string): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData | undefined = this.bookmarks_sync.get(id);
		if (!syncData)
			throw new Error(`Bookmark syncData with ID '${id}' not found.`);

		syncData.error = error;

	}

	async list(): Promise<Bookmark[]> {

		await sleep(SLEEP);
		return Array.from(this.bookmarks.values());

	}

	async listIds(): Promise<string[]> {

		await sleep(SLEEP);
		return Array.from(this.bookmarks.keys());

	}

	async getSyncData(id: string): Promise<SyncData | null> {

		await sleep(SLEEP);
		return this.bookmarks_sync.get(id) ?? null;

	}

	async getTrashItem(id: string): Promise<Bookmark | null> {

		await sleep(SLEEP);
		return this.bookmarks_trash.get(id) ?? null;

	}

	async listSyncData(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.bookmarks_sync.values());

	}

	async listNewIds(): Promise<string[]> {

		await sleep(SLEEP);
		const bookmarkIds = Array.from(this.bookmarks.keys());
		const syncIds = Array.from(this.bookmarks_sync.keys());
		return bookmarkIds.filter((key) => !syncIds.includes(key));

	}

	async listErrors(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.bookmarks_sync.values()).filter(s => !!s.error);

	}

	async listUpdated(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.bookmarks_sync.values()).filter(s => s.updated);

	}

	async moveToTrash(id: string): Promise<void> {

		await sleep(SLEEP);
		const bookmark: Bookmark | undefined = this.bookmarks.get(id);
		if (bookmark) {

			this.bookmarks_trash.set(id, bookmark);
			this.bookmarks.delete(id);
			const sync: SyncData | undefined = this.bookmarks_sync.get(id);
			if (sync)
				sync.deleted = true;

		}

	}

	async listDeletedItems(): Promise<Bookmark[]> {

		await sleep(300);
		return Array.from(this.bookmarks_trash.values());

	}

	async deletePermanently(id: string): Promise<void> {

		await sleep(SLEEP);
		this.bookmarks.delete(id);
		this.bookmarks_sync.delete(id);
		this.bookmarks_trash.delete(id);

	}

	async filterNew(entities: Metadata[]): Promise<Metadata[]> {

		await sleep(SLEEP);
		const local: SyncData[] = Array.from(this.bookmarks_sync.values());
		const localIds: Set<UUID> = new Set(local.map(s => s.id));
		return entities.filter(e => !localIds.has(e.id));

	}

	async filterUpdated(entities: Metadata[]): Promise<Metadata[]> {

		await sleep(SLEEP);
		const localMetaData = Array.from(this.bookmarks_sync.values());
		if (localMetaData.length === 0)
			return [];

		const mapLocalMetaData = new Map(localMetaData.map(e => [e.id, e]));
		const updated = entities.filter(r => {

			const localEntity = mapLocalMetaData.get(r.id);
			if (!localEntity) // if remote item not in local sync table -> skip
				return false;
			return isNewer(r.updateTime, localEntity.updateTime)

		});
		return updated;

	}

	async filterDeleted(entities: Metadata[]): Promise<SyncData[]> {

		await sleep(SLEEP);
		const set: Set<UUID> = new Set(entities.map(e => e.id));
		const localIds: SyncData[] = Array.from(this.bookmarks_sync.values());
		return localIds.filter(entity => !set.has(entity.id));

	}

	search(term: string): Promise<Bookmark[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<Bookmark[]> {

		throw new Error('Method not implemented.');

	}

	async toggleTag(id: string, name: string): Promise<void> {

		await sleep(SLEEP);
		const bookmark: Bookmark | undefined = this.bookmarks.get(id);
		if (bookmark)
			bookmark.tags = toggleArrayItem(bookmark.tags, name);

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return Array.from(this.bookmarks_remote.values());

	}

	async putRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		this.bookmarks_remote.clear();
		data.forEach(d => this.bookmarks_remote.set(d.id, d));

	}

}