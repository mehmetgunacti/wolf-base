import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { TestSuite } from '@models/test-suite.model';
import { TestSuitesRemoteRepository } from '@repositories/remote/test-suite-remote.repository';
import { Observable } from 'rxjs';

export class VoidTestSuitesCollection implements TestSuitesRemoteRepository {

	upload(item: TestSuite): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<TestSuite> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<TestSuite>[]> {
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
	trash(item: TestSuite): Observable<RemoteData<TestSuite>> {
		throw new Error('Firestore configuration missing');
	}

}
