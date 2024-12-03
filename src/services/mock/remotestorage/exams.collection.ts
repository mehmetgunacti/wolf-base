import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { Exam } from '@models/test-suite.model';
import { ExamsRemoteRepository } from '@repositories/remote/exam-remote.repository';
import { Observable } from 'rxjs';

export class VoidExamsCollection implements ExamsRemoteRepository {

	upload(item: Exam): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<Exam> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Exam>[]> {
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
	trash(item: Exam): Observable<RemoteData<Exam>> {
		throw new Error('Method not implemented.');
	}

}
