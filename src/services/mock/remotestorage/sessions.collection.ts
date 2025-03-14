import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { Session } from '@models/test-suite.model';
import { SessionsRemoteRepository } from '@repositories/remote/session-remote.repository';
import { Observable } from 'rxjs';

export class VoidSessionsCollection implements SessionsRemoteRepository {

	upload(item: Session): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<Session> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Session>[]> {
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
	trash(item: Session): Observable<RemoteData<Session>> {
		throw new Error('Firestore configuration missing');
	}

}
