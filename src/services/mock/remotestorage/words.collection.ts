import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { Word } from '@models/word.model';
import { WordsRemoteRepository } from '@repositories/remote/word-remote.repository';
import { Observable } from 'rxjs';

export class VoidWordsCollection implements WordsRemoteRepository {

	upload(item: Word): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<Word> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Word>[]> {
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
	trash(item: Word): Observable<RemoteData<Word>> {
		throw new Error('Firestore configuration missing');
	}

}
