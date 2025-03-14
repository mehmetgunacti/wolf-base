import { Bookmark, Click } from '@models/bookmark.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { BookmarksRemoteRepository } from '@repositories/remote/bookmark-remote.repository';
import { Observable } from 'rxjs';

export class VoidBookmarksCollection implements BookmarksRemoteRepository {

	uploadClicks(clicks: Click[]): Observable<Click> {
		throw new Error("Firestore configuration missing");
	}

	downloadClicks(): Observable<Click[]> {
		throw new Error("Firestore configuration missing");
	}

	upload(item: Bookmark): Observable<RemoteMetadata> {
		throw new Error("Firestore configuration missing");
	}

	download(id: string): Observable<RemoteData<Bookmark> | null> {
		throw new Error("Firestore configuration missing");
	}

	downloadMany(ids: string[]): Observable<RemoteData<Bookmark>[]> {
		throw new Error("Firestore configuration missing");
	}

	downloadMetadata(id: string): Observable<RemoteMetadata | null> {
		throw new Error("Firestore configuration missing");
	}

	downloadAllMetadata(): Observable<RemoteMetadata[]> {
		throw new Error("Firestore configuration missing");
	}

	delete(id: string): Observable<void> {
		throw new Error("Firestore configuration missing");
	}

	trash(item: Bookmark): Observable<RemoteData<Bookmark>> {
		throw new Error("Firestore configuration missing");
	}

}
