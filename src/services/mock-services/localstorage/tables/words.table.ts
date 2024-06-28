import { Metadata, RemoteData, RemoteMetadata, SyncData, UUID, Word, sleep } from '@lib';
import { WordLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';

const SLEEP = 20;

export class MockWordsLocalRepositoryImpl implements WordLocalRepository {

	private notes: Map<string, Word> = new Map();
	private notes_sync: Map<string, SyncData> = new Map();
	private notes_remote: Map<string, RemoteMetadata> = new Map();
	private notes_trash: Word[] = [];

	async getEntity(id: string): Promise<Word | null> {

		await sleep(SLEEP);
		return this.notes.get(id) ?? null;

	}

	async create(item: Partial<Word>): Promise<Word> {

		await sleep(SLEEP);
		const note: Word = {

			name: '',
			contexts: [],
			dictionary: null,
			pronunciation: null,
			definitions: [],
			...item,
			id: uuidv4()

		};
		this.notes.set(note.id, note);
		return note;

	}

	async put(item: RemoteData<Word>): Promise<void> {

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

		this.notes.set(item.metaData.id, item.entity);
		this.notes_sync.set(item.metaData.id, syncData);

	}

	async update(id: string, item: Partial<Word>): Promise<number> {

		await sleep(SLEEP);
		const note: Word | undefined = this.notes.get(id);
		if (!note)
			return 0;

		this.notes.set(id, { ...note, ...item });

		const sync: SyncData | undefined = this.notes_sync.get(id);
		if (sync)
			this.notes_sync.set(id, { ...sync, updated: true });

		return 1;

	}

	async markError(id: string, error: string): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData | undefined = this.notes_sync.get(id);
		if (!syncData)
			throw new Error(`Word syncData with ID '${id}' not found.`);

		syncData.error = error;

	}

	async list(): Promise<Word[]> {

		await sleep(SLEEP);
		return Array.from(this.notes.values());

	}

	async listIds(): Promise<string[]> {

		await sleep(SLEEP);
		return Array.from(this.notes.keys());

	}

	async getSyncData(id: string): Promise<SyncData | null> {

		await sleep(SLEEP);
		return this.notes_sync.get(id) ?? null;

	}

	async listSyncData(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.notes_sync.values());

	}

	async listNewIds(): Promise<string[]> {

		await sleep(SLEEP);
		const noteIds = Array.from(this.notes.keys());
		const syncIds = Array.from(this.notes_sync.keys());
		return noteIds.filter((key) => !syncIds.includes(key));

	}

	async listErrors(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.notes_sync.values()).filter(s => !!s.error);

	}

	async listUpdated(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.notes_sync.values()).filter(s => s.updated);

	}

	async moveToTrash(id: string): Promise<void> {

		await sleep(SLEEP);
		const note: Word | undefined = this.notes.get(id);
		if (note) {

			this.notes_trash.push(note);
			this.notes.delete(id);
			const sync: SyncData | undefined = this.notes_sync.get(id);
			if (sync)
				sync.deleted = true;

		}

	}

	async listDeletedItems(): Promise<Word[]> {

		await sleep(300);
		return Array.from(this.notes_trash.values());

	}

	async remove(id: string): Promise<UUID> {

		await sleep(SLEEP);
		const item = this.notes.get(id);
		if (item)
			this.notes_trash.push(item);
		this.notes.delete(id);
		this.notes_sync.delete(id);
		this.notes_remote.delete(id);
		return id;

	}

	search(term: string): Promise<Word[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<Word[]> {

		throw new Error('Method not implemented.');

	}

	async getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null> {

		return this.notes_remote.get(id) ?? null;

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return Array.from(this.notes_remote.values());

	}

	async storeOneRemoteMetadata(data: RemoteMetadata): Promise<RemoteMetadata> {

		this.notes_remote.set(data.id, data);
		return data;

	}

	async storeAllRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		this.notes_remote.clear();
		data.forEach(d => this.notes_remote.set(d.id, d));

	}

	async storeDownloadedEntity(data: RemoteData<Word>): Promise<RemoteData<Word>> {
		throw new Error('Method not implemented.');
	}

	async storeDownloadedEntities(items: RemoteData<Word>[]): Promise<number> {

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

		this.notes_sync.set(data.id, syncData);
		this.notes_remote.set(data.id, data);

	}

}
