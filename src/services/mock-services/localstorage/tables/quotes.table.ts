import { Metadata, RemoteData, RemoteMetadata, SyncData, UUID, Quote, sleep } from '@lib';
import { QuoteLocalRepository } from 'lib/repositories/local';
import { v4 as uuidv4 } from 'uuid';

const SLEEP = 20;

export class MockQuotesLocalRepositoryImpl implements QuoteLocalRepository {

	private quotes: Map<string, Quote> = new Map();
	private quotes_sync: Map<string, SyncData> = new Map();
	private quotes_remote: Map<string, RemoteMetadata> = new Map();
	private quotes_trash: Quote[] = [];

	async getEntity(id: string): Promise<Quote | null> {

		await sleep(SLEEP);
		return this.quotes.get(id) ?? null;

	}

	async create(item: Partial<Quote>): Promise<Quote> {

		await sleep(SLEEP);
		const quote: Quote = {

			name: '',
			author: null,
			context: null,
			...item,
			id: uuidv4()

		};
		this.quotes.set(quote.id, quote);
		return quote;

	}

	async put(item: RemoteData<Quote>): Promise<void> {

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

		this.quotes.set(item.metaData.id, item.entity);
		this.quotes_sync.set(item.metaData.id, syncData);

	}

	async update(id: string, item: Partial<Quote>): Promise<number> {

		await sleep(SLEEP);
		const quote: Quote | undefined = this.quotes.get(id);
		if (!quote)
			return 0;

		this.quotes.set(id, { ...quote, ...item });

		const sync: SyncData | undefined = this.quotes_sync.get(id);
		if (sync)
			this.quotes_sync.set(id, { ...sync, updated: true });

		return 1;

	}

	async markError(id: string, error: string): Promise<void> {

		await sleep(SLEEP);
		const syncData: SyncData | undefined = this.quotes_sync.get(id);
		if (!syncData)
			throw new Error(`Quote syncData with ID '${id}' not found.`);

		syncData.error = error;

	}

	async list(): Promise<Quote[]> {

		await sleep(SLEEP);
		return Array.from(this.quotes.values());

	}

	async listIds(): Promise<string[]> {

		await sleep(SLEEP);
		return Array.from(this.quotes.keys());

	}

	async getSyncData(id: string): Promise<SyncData | null> {

		await sleep(SLEEP);
		return this.quotes_sync.get(id) ?? null;

	}

	async listSyncData(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.quotes_sync.values());

	}

	async listNewIds(): Promise<string[]> {

		await sleep(SLEEP);
		const quoteIds = Array.from(this.quotes.keys());
		const syncIds = Array.from(this.quotes_sync.keys());
		return quoteIds.filter((key) => !syncIds.includes(key));

	}

	async listErrors(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.quotes_sync.values()).filter(s => !!s.error);

	}

	async listUpdated(): Promise<SyncData[]> {

		await sleep(SLEEP);
		return Array.from(this.quotes_sync.values()).filter(s => s.updated);

	}

	async moveToTrash(id: string): Promise<void> {

		await sleep(SLEEP);
		const quote: Quote | undefined = this.quotes.get(id);
		if (quote) {

			this.quotes_trash.push(quote);
			this.quotes.delete(id);
			const sync: SyncData | undefined = this.quotes_sync.get(id);
			if (sync)
				sync.deleted = true;

		}

	}

	async listDeletedItems(): Promise<Quote[]> {

		await sleep(300);
		return Array.from(this.quotes_trash.values());

	}

	async remove(id: string): Promise<UUID> {

		await sleep(SLEEP);
		const item = this.quotes.get(id);
		if (item)
			this.quotes_trash.push(item);
		this.quotes.delete(id);
		this.quotes_sync.delete(id);
		this.quotes_remote.delete(id);
		return id;

	}

	search(term: string): Promise<Quote[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<Quote[]> {

		throw new Error('Method not implemented.');

	}

	async getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null> {

		return this.quotes_remote.get(id) ?? null;

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return Array.from(this.quotes_remote.values());

	}

	async storeOneRemoteMetadata(data: RemoteMetadata): Promise<RemoteMetadata> {

		this.quotes_remote.set(data.id, data);
		return data;

	}

	async storeAllRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		this.quotes_remote.clear();
		data.forEach(d => this.quotes_remote.set(d.id, d));

	}

	async storeDownloadedEntity(data: RemoteData<Quote>): Promise<RemoteData<Quote>> {
		throw new Error('Method not implemented.');
	}

	async storeDownloadedEntities(items: RemoteData<Quote>[]): Promise<number> {

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

		this.quotes_sync.set(data.id, syncData);
		this.quotes_remote.set(data.id, data);

	}

}
