import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { Exam } from '@models/test-suite.model';
import { ExamsRemoteRepository } from '@repositories/remote/exam-remote.repository';
import { Observable } from 'rxjs';

export class VoidExamsCollection implements ExamsRemoteRepository {

	upload(item: Exam): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<Exam> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Exam>[]> {
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
	trash(item: Exam): Observable<RemoteData<Exam>> {
		throw new Error('Firestore configuration missing');
	}

}
