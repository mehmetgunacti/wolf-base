import { Bookmark, Click, RemoteData, RemoteMetadata } from '@models';
import { BookmarksRemoteRepository } from '@repositories';
import { Observable } from 'rxjs';

export class VoidBookmarksCollection implements BookmarksRemoteRepository {

	uploadClicks(clicks: Click[]): Observable<Click> {
		throw new Error("Method not implemented.");
	}

	downloadClicks(): Observable<Click[]> {
		throw new Error("Method not implemented.");
	}

	upload(item: Bookmark): Observable<RemoteMetadata> {
		throw new Error("Method not implemented.");
	}

	download(id: string): Observable<RemoteData<Bookmark> | null> {
		throw new Error("Method not implemented.");
	}

	downloadMany(ids: string[]): Observable<RemoteData<Bookmark>[]> {
		throw new Error("Method not implemented.");
	}

	downloadMetadata(id: string): Observable<RemoteMetadata | null> {
		throw new Error("Method not implemented.");
	}

	downloadAllMetadata(): Observable<RemoteMetadata[]> {
		throw new Error("Method not implemented.");
	}

	delete(id: string): Observable<void> {
		throw new Error("Method not implemented.");
	}

	trash(item: Bookmark): Observable<RemoteData<Bookmark>> {
		throw new Error("Method not implemented.");
	}

}
