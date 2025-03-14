import { NoteContent } from '@models/note.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { NoteContentRemoteRepository } from '@repositories/remote/note-content-remote.repository';
import { Observable } from 'rxjs';

export class VoidNoteContentCollection implements NoteContentRemoteRepository {

	upload(item: NoteContent): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<NoteContent> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<NoteContent>[]> {
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
	trash(item: NoteContent): Observable<RemoteData<NoteContent>> {
		throw new Error('Firestore configuration missing');
	}

}
