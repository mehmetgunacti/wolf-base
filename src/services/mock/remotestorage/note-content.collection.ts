import { NoteContent, RemoteData, RemoteMetadata } from '@models';
import { NoteContentRemoteRepository } from '@repositories';
import { Observable } from 'rxjs';

export class VoidNoteContentCollection implements NoteContentRemoteRepository {

	upload(item: NoteContent): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<NoteContent> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<NoteContent>[]> {
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
	trash(item: NoteContent): Observable<RemoteData<NoteContent>> {
		throw new Error('Method not implemented.');
	}

}
