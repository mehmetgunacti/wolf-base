import { Metadata, Note, NoteContent, RemoteData, RemoteMetadata, SyncData, UUID, sleep } from '@lib';
import { NotesContentLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';

const SLEEP = 20;

export class MockNotesContentLocalRepositoryImpl implements NotesContentLocalRepository {

	private content: Map<string, NoteContent> = new Map();
	private content_sync: Map<string, SyncData> = new Map();
	private content_remote: Map<string, RemoteMetadata> = new Map();
	private content_trash: NoteContent[] = [];

	async getEntity(id: string): Promise<NoteContent | null> {

		await sleep(SLEEP);
		return this.content.get(id) ?? null;

	}

	async create(item: Partial<NoteContent>): Promise<NoteContent> {

		await sleep(SLEEP);
		const note: NoteContent = {

			name: '',
			content: '',
			...item,
			id: uuidv4()

		};
		this.content.set(note.id, note);
		return note;

	}

	async put(item: RemoteData<NoteContent>): Promise<void> {

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

		this.content.set(item.metaData.id, item.entity);
		this.content_sync.set(item.metaData.id, syncData);

	}

	async update(id: string, item: Partial<Note>): Promise<number> {

		await sleep(SLEEP);
		const note: NoteContent | undefined = this.content.get(id);
		if (!note)
			return 0;

		this.content.set(id, { ...note, ...item });

		const sync: SyncData | undefined = this.content_sync.get(id);
		if (sync)
			this.content_sync.set(id, { ...sync, updated: true });

		return 1;

	}

	async markError(id: string, error: string): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData | undefined = this.content_sync.get(id);
		if (!syncData)
			throw new Error(`NoteContent syncData with ID '${id}' not found.`);

		syncData.error = error;

	}

	async list(): Promise<NoteContent[]> {

		await sleep(SLEEP);
		return Array.from(this.content.values());

	}

	async listIds(): Promise<string[]> {

		await sleep(SLEEP);
		return Array.from(this.content.keys());

	}

	async getSyncData(id: string): Promise<SyncData | null> {

		await sleep(SLEEP);
		return this.content_sync.get(id) ?? null;

	}

	async listSyncData(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.content_sync.values());

	}

	async listNewIds(): Promise<string[]> {

		await sleep(SLEEP);
		const noteIds = Array.from(this.content.keys());
		const syncIds = Array.from(this.content_sync.keys());
		return noteIds.filter((key) => !syncIds.includes(key));

	}

	async listErrors(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.content_sync.values()).filter(s => !!s.error);

	}

	async listUpdated(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.content_sync.values()).filter(s => s.updated);

	}

	async moveToTrash(id: string): Promise<void> {

		await sleep(SLEEP);
		const note: NoteContent | undefined = this.content.get(id);
		if (note) {

			this.content_trash.push(note);
			this.content.delete(id);
			const sync: SyncData | undefined = this.content_sync.get(id);
			if (sync)
				sync.deleted = true;

		}

	}

	async listDeletedItems(): Promise<NoteContent[]> {

		await sleep(300);
		return Array.from(this.content_trash.values());

	}

	async remove(id: string): Promise<UUID> {

		await sleep(SLEEP);
		const item = this.content.get(id);
		if (item)
			this.content_trash.push(item);
		this.content.delete(id);
		this.content_sync.delete(id);
		this.content_remote.delete(id);
		return id;

	}

	search(term: string): Promise<Note[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<Note[]> {

		throw new Error('Method not implemented.');

	}

	async getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null> {

		return this.content_remote.get(id) ?? null;

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return Array.from(this.content_remote.values());

	}

	async storeOneRemoteMetadata(data: RemoteMetadata): Promise<RemoteMetadata> {

		this.content_remote.set(data.id, data);
		return data;

	}

	async storeAllRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		this.content_remote.clear();
		data.forEach(d => this.content_remote.set(d.id, d));

	}

	async storeDownloadedEntity(data: RemoteData<NoteContent>): Promise<RemoteData<NoteContent>> {
		throw new Error('Method not implemented.');
	}

	async storeDownloadedEntities(items: RemoteData<NoteContent>[]): Promise<number> {

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

		this.content_sync.set(data.id, syncData);
		this.content_remote.set(data.id, data);

	}

}
