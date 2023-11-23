import { KBEntry, Metadata, RemoteData, RemoteMetadata, SyncData, UUID, sleep, toggleArrayItem } from '@lib';
import { KBEntriesLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';

const SLEEP = 20;

export class MockKBEntriesLocalRepositoryImpl implements KBEntriesLocalRepository {

	private kbEntries: Map<string, KBEntry> = new Map();
	private kbEntries_sync: Map<string, SyncData> = new Map();
	private kbEntries_remote: Map<string, RemoteMetadata> = new Map();
	private kbEntries_trash: KBEntry[] = [];

	async getEntity(id: string): Promise<KBEntry | null> {

		await sleep(SLEEP);
		return this.kbEntries.get(id) ?? null;

	}

	async create(item: Partial<KBEntry>): Promise<KBEntry> {

		await sleep(SLEEP);
		const kbEntry: KBEntry = {

			name: '',
			urls: [''],
			parentId: null,
			...item,
			popular: false,
			id: uuidv4()

		};
		this.kbEntries.set(kbEntry.id, kbEntry);
		return kbEntry;

	}

	async put(item: RemoteData<KBEntry>): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData = {

			id: item.metaData.id,
			name: item.metaData.name,
			createTime: item.metaData.createTime,
			updateTime: item.metaData.updateTime,
			updated: false,
			deleted: false,
			error: null

		}

		this.kbEntries.set(item.metaData.id, item.entity);
		this.kbEntries_sync.set(item.metaData.id, syncData);

	}

	async update(id: string, item: Partial<KBEntry>): Promise<number> {

		await sleep(SLEEP);
		const bookmark: KBEntry | undefined = this.kbEntries.get(id);
		if (!bookmark)
			return 0;

		this.kbEntries.set(id, { ...bookmark, ...item });

		const sync: SyncData | undefined = this.kbEntries_sync.get(id);
		if (sync)
			this.kbEntries_sync.set(id, { ...sync, updated: true });

		return 1;

	}

	async markError(id: string, error: string): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData | undefined = this.kbEntries_sync.get(id);
		if (!syncData)
			throw new Error(`KBEntry syncData with ID '${id}' not found.`);

		syncData.error = error;

	}

	async list(): Promise<KBEntry[]> {

		await sleep(SLEEP);
		return Array.from(this.kbEntries.values());

	}

	async listIds(): Promise<string[]> {

		await sleep(SLEEP);
		return Array.from(this.kbEntries.keys());

	}

	async getSyncData(id: string): Promise<SyncData | null> {

		await sleep(SLEEP);
		return this.kbEntries_sync.get(id) ?? null;

	}

	async listSyncData(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.kbEntries_sync.values());

	}

	async listNewIds(): Promise<string[]> {

		await sleep(SLEEP);
		const bookmarkIds = Array.from(this.kbEntries.keys());
		const syncIds = Array.from(this.kbEntries_sync.keys());
		return bookmarkIds.filter((key) => !syncIds.includes(key));

	}

	async listErrors(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.kbEntries_sync.values()).filter(s => !!s.error);

	}

	async listUpdated(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.kbEntries_sync.values()).filter(s => s.updated);

	}

	async moveToTrash(id: string): Promise<void> {

		await sleep(SLEEP);
		const bookmark: KBEntry | undefined = this.kbEntries.get(id);
		if (bookmark) {

			this.kbEntries_trash.push(bookmark);
			this.kbEntries.delete(id);
			const sync: SyncData | undefined = this.kbEntries_sync.get(id);
			if (sync)
				sync.deleted = true;

		}

	}

	async listDeletedItems(): Promise<KBEntry[]> {

		await sleep(300);
		return Array.from(this.kbEntries_trash.values());

	}

	async bulkRemove(ids: UUID[]): Promise<number> {

		for (const id of ids)
			await this.remove(id);
		return ids.length;

	}

	async remove(id: string): Promise<number> {

		await sleep(SLEEP);
		const item = this.kbEntries.get(id);
		if (item)
			this.kbEntries_trash.push(item);
		this.kbEntries.delete(id);
		this.kbEntries_sync.delete(id);
		this.kbEntries_remote.delete(id);
		return 1;

	}

	search(term: string): Promise<KBEntry[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<KBEntry[]> {

		throw new Error('Method not implemented.');

	}

	async getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null> {

		return this.kbEntries_remote.get(id) ?? null;

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return Array.from(this.kbEntries_remote.values());

	}

	async storeRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		this.kbEntries_remote.clear();
		data.forEach(d => this.kbEntries_remote.set(d.id, d));

	}

	async storeRemoteData(items: RemoteData<KBEntry>[]): Promise<number> {

		await sleep(SLEEP);
		items.forEach(item => this.put(item));
		return items.length;

	}

	async storeMetadata(data: Metadata): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData = {

			id: data.id,
			name: data.name,
			createTime: data.createTime,
			updateTime: data.updateTime,
			updated: false,
			deleted: false,
			error: null

		}

		this.kbEntries_sync.set(data.id, syncData);
		this.kbEntries_remote.set(data.id, data);

	}

}
