import { Quote } from '@models/quote.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { QuotesRemoteRepository } from '@repositories/remote/quote-remote.repository';
import { Observable } from 'rxjs';

export class VoidQuotesCollection implements QuotesRemoteRepository {

	upload(item: Quote): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<Quote> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Quote>[]> {
		throw new Error('Firestore configuration missing');
	}
	downloadMetadata(id: string): Observable<RemoteMetadata | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadAllMetadata(): Observable<RemoteMetadata[]> {
		throw new Error('Firestore configuration missing');
	}
	delete(id: string): Observable<void> {
		throw new Error('Firestore configuration missing');
	}
	trash(item: Quote): Observable<RemoteData<Quote>> {
		throw new Error('Firestore configuration missing');
	}

}
