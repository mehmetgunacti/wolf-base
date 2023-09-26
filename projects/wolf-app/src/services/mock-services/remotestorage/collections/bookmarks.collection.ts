import { Bookmark, BookmarksCollection, Click, RemoteData, RemoteMetadata, UUID } from '@lib';
import { Observable, delay, map, of } from "rxjs";

const SLEEP = 20;

export class MockBookmarksCollection implements BookmarksCollection {

	private bookmarks: Record<string, RemoteData<Bookmark>> = {};
	private bookmarks_trash: Record<string, RemoteData<Bookmark>> = {};
	private clicks: Record<UUID, number> = {};

	download(id: string): Observable<RemoteData<Bookmark> | null> {

		return of(this.bookmarks[id] ?? null).pipe(delay(SLEEP));

	}

	downloadMany(ids?: UUID[]): Observable<RemoteData<Bookmark>[]> {

		if (ids)
			return of(Object.keys(this.bookmarks).filter(id => ids.includes(id)).map(id => this.bookmarks[id])).pipe(delay(SLEEP));

		return of(Object.values(this.bookmarks)).pipe(delay(SLEEP));

	}

	downloadAllMetadata(): Observable<RemoteMetadata[]> {

		return this.downloadMany().pipe(
			map(arr => arr.map(item => item.metaData))
		)

	}

	downloadMetadata(id: UUID): Observable<RemoteMetadata | null> {

		const item = this.bookmarks[id];
		if (item)
			return of(item.metaData).pipe(delay(SLEEP));

		return of(null).pipe(delay(SLEEP));

	}

	upload(item: Bookmark): Observable<RemoteMetadata> {

		const current = this.bookmarks[item.id];
		const createTime = current ? current.metaData.createTime : new Date().toISOString();
		const metadata: RemoteMetadata = {

			id: item.id,
			createTime,
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Bookmark> = {

			metaData: metadata,
			entity: item,

		};
		this.bookmarks[item.id] = remoteData;
		return of(remoteData.metaData).pipe(delay(SLEEP));

	}

	delete(id: string): Observable<void> {

		delete this.bookmarks[id];
		return of().pipe(delay(SLEEP));

	}

	moveToTrash(id: string): Observable<UUID | null> {


		const b = this.bookmarks[id];
		if (b) {
			this.bookmarks_trash[id] = b;
			this.delete(id);
			return of(id);
		}
		return of(null);

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

	uploadClicks(clicks: Click[]): Observable<number> {

		for (const click of clicks)
			this.clicks[click.id] += click.current;
		return of(clicks.length);

	}

	increase(id: string, amount: number): Observable<number> {

		let current = this.clicks[id] ?? 0;
		current += amount;
		this.clicks[id] = current;
		return of(current);

	}

	downloadClicks(): Observable<Click[]> {

		return of(Object.keys(this.clicks).map(id => ({ id, current: 0, total: this.clicks[id] })));

	}

}

export class VoidBookmarksCollection implements BookmarksCollection {

	uploadClicks(clicks: Click[]): Observable<number> {
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
