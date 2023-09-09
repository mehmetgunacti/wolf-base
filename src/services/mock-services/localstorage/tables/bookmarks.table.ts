import { Bookmark, BookmarksTable, LogCategory, RemoteData, RemoteMetadata, SyncData, UUID, sleep, toggleArrayItem } from "lib";
import { v4 as uuidv4 } from 'uuid';

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

	async deleteMetadata(id: UUID, category: LogCategory): Promise<void> {

		await sleep(SLEEP);
		this.bookmarks_sync.delete(id);
		this.bookmarks_remote.delete(id);

	}

	async deletePermanently(id: string, category: LogCategory): Promise<void> {

		await sleep(SLEEP);
		this.bookmarks.delete(id);
		this.bookmarks_sync.delete(id);
		this.bookmarks_trash.delete(id);

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

	async getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null> {

		return this.bookmarks_remote.get(id) ?? null;

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return Array.from(this.bookmarks_remote.values());

	}

	async putRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		this.bookmarks_remote.clear();
		data.forEach(d => this.bookmarks_remote.set(d.id, d));

	}

}