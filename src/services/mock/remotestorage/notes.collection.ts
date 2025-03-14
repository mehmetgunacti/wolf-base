import { Note } from '@models/note.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { NotesRemoteRepository } from '@repositories/remote/note-remote.repository';
import { Observable } from 'rxjs';

export class VoidNotesCollection implements NotesRemoteRepository {

	upload(item: Note): Observable<RemoteMetadata> {
		throw new Error('Firestore configuration missing');
	}
	download(id: string): Observable<RemoteData<Note> | null> {
		throw new Error('Firestore configuration missing');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Note>[]> {
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
	trash(item: Note): Observable<RemoteData<Note>> {
		throw new Error('Firestore configuration missing');
	}

}
