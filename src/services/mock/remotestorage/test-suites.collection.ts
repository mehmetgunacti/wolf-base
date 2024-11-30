import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { TestSuite } from '@models/test-suite.model';
import { TestSuitesRemoteRepository } from '@repositories/remote/test-suite-remote.repository';
import { Observable } from 'rxjs';

export class VoidTestSuitesCollection implements TestSuitesRemoteRepository {

	upload(item: TestSuite): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<TestSuite> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<TestSuite>[]> {
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
	trash(item: TestSuite): Observable<RemoteData<TestSuite>> {
		throw new Error('Method not implemented.');
	}

}
