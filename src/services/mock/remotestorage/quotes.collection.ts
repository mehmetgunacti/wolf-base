import { Quote, RemoteData, RemoteMetadata } from '@models';
import { QuotesRemoteRepository } from '@repositories';
import { Observable } from 'rxjs';

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
