import { RemoteData, RemoteMetadata, Word } from '@models';
import { WordsRemoteRepository } from '@repositories';
import { Observable } from 'rxjs';

export class VoidWordsCollection implements WordsRemoteRepository {

	upload(item: Word): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<Word> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Word>[]> {
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
	trash(item: Word): Observable<RemoteData<Word>> {
		throw new Error('Method not implemented.');
	}

}
