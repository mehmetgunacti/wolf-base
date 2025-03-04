import { QuizEntry } from '@models/quiz.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { QuizEntriesRemoteRepository } from '@repositories/remote/quiz-entry-remote.repository';
import { Observable } from 'rxjs';

export class VoidQuizEntriesCollection implements QuizEntriesRemoteRepository {

	upload(item: QuizEntry): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<QuizEntry> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<QuizEntry>[]> {
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
	trash(item: QuizEntry): Observable<RemoteData<QuizEntry>> {
		throw new Error('Method not implemented.');
	}

}
