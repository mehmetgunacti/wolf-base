import { QuizEntry } from '@models/quiz.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { QuizEntriesRemoteRepository } from '@repositories/remote/quiz-entry-remote.repository';
import { Observable } from 'rxjs';

export class VoidQuizEntriesCollection implements QuizEntriesRemoteRepository {

	upload(item: QuizEntry): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<QuizEntry> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<QuizEntry>[]> {
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
	trash(item: QuizEntry): Observable<RemoteData<QuizEntry>> {
		throw new Error('Firestore configuration missing');
	}

}
