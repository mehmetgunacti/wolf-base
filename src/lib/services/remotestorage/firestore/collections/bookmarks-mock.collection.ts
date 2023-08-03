import { RemoteData, RemoteMetadata } from 'lib/models';
import { Bookmark } from 'lib/models/bookmark.model';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { sleep } from 'lib/utils';

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
