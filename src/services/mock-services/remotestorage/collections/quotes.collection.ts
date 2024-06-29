import { Quote, RemoteData, RemoteMetadata, UUID } from '@lib';
import { QuotesRemoteRepository } from 'lib/repositories/remote/quote-remote.repository';
import { Observable, delay, map, of } from 'rxjs';

const SLEEP = 20;

export class MockQuotesCollection implements QuotesRemoteRepository {

	private quotes: Record<string, RemoteData<Quote>> = {};
	private quotes_trash: Record<string, RemoteData<Quote>> = {};

	download(id: string): Observable<RemoteData<Quote> | null> {

		return of(this.quotes[id] ?? null).pipe(delay(SLEEP));

	}

	downloadMany(ids?: UUID[]): Observable<RemoteData<Quote>[]> {

		if (ids)
			return of(Object.keys(this.quotes).filter(id => ids.includes(id)).map(id => this.quotes[id])).pipe(delay(SLEEP));

		return of(Object.values(this.quotes)).pipe(delay(SLEEP));

	}

	downloadAllMetadata(): Observable<RemoteMetadata[]> {

		return this.downloadMany().pipe(
			map(arr => arr.map(item => item.metaData))
		)

	}

	downloadMetadata(id: UUID): Observable<RemoteMetadata | null> {

		const item = this.quotes[id];
		if (item)
			return of(item.metaData).pipe(delay(SLEEP));

		return of(null).pipe(delay(SLEEP));

	}

	upload(item: Quote): Observable<RemoteMetadata> {

		const current = this.quotes[item.id];
		const createTime = current ? current.metaData.createTime : new Date().toISOString();
		const metadata: RemoteMetadata = {

			id: item.id,
			name: item.name,
			createTime,
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Quote> = {

			metaData: metadata,
			entity: item,

		};
		this.quotes[item.id] = remoteData;
		return of(remoteData.metaData).pipe(delay(SLEEP));

	}

	delete(id: string): Observable<void> {

		delete this.quotes[id];
		return of().pipe(delay(SLEEP));

	}

	moveToTrash(id: string): Observable<UUID | null> {


		const b = this.quotes[id];
		if (b) {
			this.quotes_trash[id] = b;
			this.delete(id);
			return of(id);
		}
		return of(null);

	}

	trash(item: Quote): Observable<RemoteData<Quote>> {

		const metaData: RemoteMetadata = {

			id: item.id,
			name: item.name,
			createTime: new Date().toISOString(),
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Quote> = {

			metaData,
			entity: item,

		};
		this.quotes_trash[item.id] = remoteData;
		return of(remoteData).pipe(delay(SLEEP));

	}

}

export class VoidQuotesCollection implements QuotesRemoteRepository {

	upload(item: Quote): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<Quote> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Quote>[]> {
		throw new Error('Method not implemented.');
	}
	downloadMetadata(id: string): Observable<RemoteMetadata | null> {
		throw new Error('Method not implemented.');
	}
	downloadAllMetadata(): Observable<RemoteMetadata[]> {
		throw new Error('Method not implemented.');
	}
	delete(id: string): Observable<void> {
		throw new Error('Method not implemented.');
	}
	trash(item: Quote): Observable<RemoteData<Quote>> {
		throw new Error('Method not implemented.');
	}

}
