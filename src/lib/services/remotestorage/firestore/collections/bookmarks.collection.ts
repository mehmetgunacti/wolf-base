import { UUID } from 'lib/constants/common.constant';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreIncreaseURL } from 'lib/utils';
import { Firestore } from 'lib/utils/firestore/firestore.tool';
import { BookmarkFirestoreConverter } from '../converter';
import { FirestoreCollection } from '../firestore.collection';
import { RemoteData, RemoteMetadata } from 'lib/models';

export class BookmarksFirestoreCollection extends FirestoreCollection<Bookmark> implements BookmarksCollection {

	constructor(firestore: Firestore) {
		super(
			firestore,
			RemoteCollection.bookmarks,
			new BookmarkFirestoreConverter()
		);
	}

	async click(id: UUID, amount: number = 1): Promise<number> {

		const url = new FirestoreIncreaseURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			RemoteCollection.bookmarks_clicks,
			id,
			'clicks',
			':commit',
			amount
		);
		return await this.firestore.increase(url);

	}

}

export class MockBookmarksFirestoreCollection implements BookmarksCollection {

	private bookmarks: Map<string, RemoteData<Bookmark>> = new Map();
	private bookmarks_trash: Map<string, RemoteData<Bookmark>> = new Map();

	downloadOne(id: string): Promise<RemoteData<Bookmark> | null> {

		const bookmark = this.bookmarks.get(id);
		return Promise.resolve(bookmark || null);

	}

	downloadMany(): Promise<RemoteData<Bookmark>[]> {

		return Promise.resolve(
			[...this.bookmarks.values()]
		);

	}

	downloadIds(): Promise<RemoteMetadata[]> {

		return Promise.resolve(
			[...this.bookmarks.values()].map(b => b.metaData)
		);

	}

	upload(item: Bookmark): Promise<RemoteData<Bookmark>> {

		const current = this.bookmarks.get(item.id);
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
		this.bookmarks.set(item.id, remoteData);
		return Promise.resolve(remoteData);

	}

	delete(id: string): Promise<void> {

		this.bookmarks.delete(id);
		return Promise.resolve();

	}

	moveToTrash(id: string): Promise<void> {

		const b = this.bookmarks.get(id);
		if (b)
			this.bookmarks_trash.set(id, b);
		return Promise.resolve();

	}

	trash(item: Bookmark): Promise<void> {

		const metadata: RemoteMetadata = {

			id: item.id,
			createTime: new Date().toISOString(),
			updateTime: new Date().toISOString(),

		};
		const remoteData: RemoteData<Bookmark> = {

			metaData: metadata,
			entity: item,

		};
		this.bookmarks_trash.set(item.id, remoteData);
		return Promise.resolve();

	}

}
