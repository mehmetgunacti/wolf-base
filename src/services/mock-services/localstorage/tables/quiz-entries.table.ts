import { Metadata, QuizEntry, QuizProgress, RemoteData, RemoteMetadata, SyncData, UUID, sleep } from '@lib';
import { QuizEntryLocalRepository } from 'lib/repositories/local/quiz-entry.repository';
import { v4 as uuidv4 } from 'uuid';

const SLEEP = 20;

export class MockQuizEntryLocalRepositoryImpl implements QuizEntryLocalRepository {

	private quizEntries: Map<string, QuizEntry> = new Map();
	private quizEntries_sync: Map<string, SyncData> = new Map();
	private quizEntries_remote: Map<string, RemoteMetadata> = new Map();
	private quizEntries_trash: QuizEntry[] = [];

	async getEntity(id: string): Promise<QuizEntry | null> {

		await sleep(SLEEP);
		return this.quizEntries.get(id) ?? null;

	}

	async create(item: Partial<QuizEntry>): Promise<QuizEntry> {

		await sleep(SLEEP);
		const quizEntry: QuizEntry = {

			name: '',
			level: QuizProgress.START,
			next: new Date().getTime(),
			...item,
			id: uuidv4()

		};
		this.quizEntries.set(quizEntry.id, quizEntry);
		return quizEntry;

	}

	async put(item: RemoteData<QuizEntry>): Promise<void> {

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

		this.quizEntries.set(item.metaData.id, item.entity);
		this.quizEntries_sync.set(item.metaData.id, syncData);

	}

	async update(id: string, item: Partial<QuizEntry>): Promise<number> {

		await sleep(SLEEP);
		const quizEntry: QuizEntry | undefined = this.quizEntries.get(id);
		if (!quizEntry)
			return 0;

		this.quizEntries.set(id, { ...quizEntry, ...item });

		const sync: SyncData | undefined = this.quizEntries_sync.get(id);
		if (sync)
			this.quizEntries_sync.set(id, { ...sync, updated: true });

		return 1;

	}

	async markError(id: string, error: string): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData | undefined = this.quizEntries_sync.get(id);
		if (!syncData)
			throw new Error(`QuizEntry syncData with ID '${id}' not found.`);

		syncData.error = error;

	}

	async list(): Promise<QuizEntry[]> {

		await sleep(SLEEP);
		return Array.from(this.quizEntries.values());

	}

	async listIds(): Promise<string[]> {

		await sleep(SLEEP);
		return Array.from(this.quizEntries.keys());

	}

	async getSyncData(id: string): Promise<SyncData | null> {

		await sleep(SLEEP);
		return this.quizEntries_sync.get(id) ?? null;

	}

	async listSyncData(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.quizEntries_sync.values());

	}

	async listNewIds(): Promise<string[]> {

		await sleep(SLEEP);
		const quizEntryIds = Array.from(this.quizEntries.keys());
		const syncIds = Array.from(this.quizEntries_sync.keys());
		return quizEntryIds.filter((key) => !syncIds.includes(key));

	}

	async listErrors(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.quizEntries_sync.values()).filter(s => !!s.error);

	}

	async listUpdated(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.quizEntries_sync.values()).filter(s => s.updated);

	}

	async moveToTrash(id: string): Promise<void> {

		await sleep(SLEEP);
		const quizEntry: QuizEntry | undefined = this.quizEntries.get(id);
		if (quizEntry) {

			this.quizEntries_trash.push(quizEntry);
			this.quizEntries.delete(id);
			const sync: SyncData | undefined = this.quizEntries_sync.get(id);
			if (sync)
				sync.deleted = true;

		}

	}

	async listDeletedItems(): Promise<QuizEntry[]> {

		await sleep(300);
		return Array.from(this.quizEntries_trash.values());

	}

	async remove(id: string): Promise<UUID> {

		await sleep(SLEEP);
		const item = this.quizEntries.get(id);
		if (item)
			this.quizEntries_trash.push(item);
		this.quizEntries.delete(id);
		this.quizEntries_sync.delete(id);
		this.quizEntries_remote.delete(id);
		return id;

	}

	search(term: string): Promise<QuizEntry[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<QuizEntry[]> {

		throw new Error('Method not implemented.');

	}

	async getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null> {

		return this.quizEntries_remote.get(id) ?? null;

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return Array.from(this.quizEntries_remote.values());

	}

	async storeOneRemoteMetadata(data: RemoteMetadata): Promise<RemoteMetadata> {

		this.quizEntries_remote.set(data.id, data);
		return data;

	}

	async storeAllRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		this.quizEntries_remote.clear();
		data.forEach(d => this.quizEntries_remote.set(d.id, d));

	}

	async storeDownloadedEntity(data: RemoteData<QuizEntry>): Promise<RemoteData<QuizEntry>> {
		throw new Error('Method not implemented.');
	}

	async storeDownloadedEntities(items: RemoteData<QuizEntry>[]): Promise<number> {

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

		this.quizEntries_sync.set(data.id, syncData);
		this.quizEntries_remote.set(data.id, data);

	}

}
