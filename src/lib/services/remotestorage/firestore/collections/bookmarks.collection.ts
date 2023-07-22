import { UUID } from 'lib/constants/common.constant';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreIncreaseURL, sleep } from 'lib/utils';
import { Firestore } from 'lib/utils/firestore/firestore.tool';
import { BookmarkFirestoreConverter } from '../converter';
import { FirestoreCollection } from '../firestore.collection';
import { FirestoreConfig, RemoteData, RemoteMetadata } from 'lib/models';

export class BookmarksFirestoreCollection extends FirestoreCollection<Bookmark> implements BookmarksCollection {

	constructor(firestore: Firestore, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			RemoteCollection.bookmarks,
			new BookmarkFirestoreConverter()
		);
	}

	async click(id: UUID, amount: number = 1): Promise<number> {

		const url = new FirestoreIncreaseURL(
			this.firestoreConfig,
			RemoteCollection.bookmarks_clicks,
			id,
			'clicks',
			':commit',
			amount
		);
		return await this.firestore.increase(url);

	}

}

const SLEEP = 20;

export class MockBookmarksFirestoreCollection implements BookmarksCollection {

	private bookmarks: Map<string, RemoteData<Bookmark>> = new Map();
	private bookmarks_trash: Map<string, RemoteData<Bookmark>> = new Map();

	async downloadOne(id: string): Promise<RemoteData<Bookmark> | null> {

		await sleep(SLEEP);
		return this.bookmarks.get(id) ?? null;

	}

	async downloadMany(): Promise<RemoteData<Bookmark>[]> {

		await sleep(SLEEP);
		return [...this.bookmarks.values()];

	}

	async downloadIds(): Promise<RemoteMetadata[]> {

		await sleep(SLEEP);
		return [...this.bookmarks.values()].map(b => b.metaData);

	}

	async upload(item: Bookmark): Promise<RemoteData<Bookmark>> {

		await sleep(SLEEP);
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
		return remoteData;

	}

	async delete(id: string): Promise<void> {

		await sleep(SLEEP);
		this.bookmarks.delete(id);

	}

	async moveToTrash(id: string): Promise<void> {

		await sleep(SLEEP);
		const b = this.bookmarks.get(id);
		if (b)
			this.bookmarks_trash.set(id, b);

	}

	async trash(item: Bookmark): Promise<void> {

		await sleep(SLEEP);
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

	}

}
