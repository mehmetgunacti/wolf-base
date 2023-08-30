import { UUID } from 'lib/constants';
import { RemoteData, RemoteMetadata } from 'lib/models';
import { Bookmark } from 'lib/models/bookmark.model';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { Observable, delay, map, of } from 'rxjs';

const SLEEP = 20;

export class MockBookmarksFirestoreCollection implements BookmarksCollection {

	private bookmarks: Record<string, RemoteData<Bookmark>> = {};
	private bookmarks_trash: Record<string, RemoteData<Bookmark>> = {};

	downloadOne(id: string): Observable<RemoteData<Bookmark> | null> {

		return of(this.bookmarks[id] ?? null).pipe(delay(SLEEP));

	}

	downloadMany(ids?: UUID[]): Observable<RemoteData<Bookmark>[]> {

		if (ids)
			return of(Object.keys(this.bookmarks).filter(id => ids.includes(id)).map(id => this.bookmarks[id])).pipe(delay(SLEEP));

		return of(Object.values(this.bookmarks)).pipe(delay(SLEEP));

	}

	downloadIds(): Observable<RemoteMetadata[]> {

		return this.downloadMany().pipe(
			map(arr => arr.map(item => item.metaData))
		)

	}

	upload(item: Bookmark): Observable<RemoteData<Bookmark>> {

		const current = this.bookmarks[item.id];
		const createTime = current ? current.metaData.createTime : new Date().toISOString();
		const metaData: RemoteMetadata = {

			id: item.id,
			createTime,
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Bookmark> = {

			metaData,
			entity: item,

		};
		this.bookmarks[item.id] = remoteData;
		return of(remoteData).pipe(delay(SLEEP));

	}

	delete(id: string): Observable<void> {

		delete this.bookmarks[id];
		return of().pipe(delay(SLEEP));

	}

	moveToTrash(id: string): Observable<void> {


		const b = this.bookmarks[id];
		if (b)
			this.bookmarks_trash[id] = b;
		return this.delete(id);

	}

	trash(item: Bookmark): Observable<RemoteData<Bookmark>> {

		const metaData: RemoteMetadata = {

			id: item.id,
			createTime: new Date().toISOString(),
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Bookmark> = {

			metaData,
			entity: item,

		};
		this.bookmarks_trash[item.id] = remoteData;
		return of(remoteData).pipe(delay(SLEEP));

	}

}
