import { Note } from '@models/note.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { NotesRemoteRepository } from '@repositories/remote/note-remote.repository';
import { Observable } from 'rxjs';

export class VoidNotesCollection implements NotesRemoteRepository {

	upload(item: Note): Observable<RemoteMetadata> {
		throw new Error('Method not implemented.');
	}
	download(id: string): Observable<RemoteData<Note> | null> {
		throw new Error('Method not implemented.');
	}
	downloadMany(ids: string[]): Observable<RemoteData<Note>[]> {
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
	trash(item: Note): Observable<RemoteData<Note>> {
		throw new Error('Method not implemented.');
	}

}
