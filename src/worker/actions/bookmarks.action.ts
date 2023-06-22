import { Entity, LocalStorageService, RemoteStorageService, UUID, sleep, syncState } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { SyncEvent } from 'lib/models/sync.model';
import { Action } from './base.action';

export class BookmarksSyncAction implements Action<void, AsyncGenerator<SyncEvent>> {

	private collection = RemoteCollection.bookmarks;
	protected remoteIds: Entity[] = [];

	constructor(
		protected localStorage: LocalStorageService,
		protected remoteStorage: RemoteStorageService
	) { }

	async *execute(): AsyncGenerator<SyncEvent> {


		yield* this.uploadNew();
		yield* this.downloadIds();
		yield* this.downloadNew();

		yield* this.uploadDeleted();
		yield* this.downloadDeleted();

		yield* this.uploadUpdated();
		yield* this.downloadUpdated();

	}

	protected async *downloadIds(): AsyncGenerator<SyncEvent> {

		await sleep(500);
		yield syncState(this.collection, `downloading Ids...`);
		this.remoteIds = await this.remoteStorage.bookmarks.downloadIds();
		yield syncState(this.collection, `${this.remoteIds.length} Ids downloaded.`);

	}

	protected async *uploadNew(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `finding new items to be uploaded`);
		await sleep(500);

		// read all new items
		const items: Bookmark[] = await this.localStorage.bookmarks.list({ filterFn: b => !b.createTime });

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no new items to upload.`);
			return;

		}

		// upload new items
		yield syncState(this.collection, `${items.length} new items to be uploaded.`);
		yield* this.uploadNewItems(items);
		yield syncState(this.collection, `uploaded ${items.length} new items.`);

	}

	private async *uploadNewItems(items: Bookmark[]): AsyncGenerator<SyncEvent> {

		for (const [idx, item] of items.entries()) {

			await sleep(500);
			yield syncState(this.collection, `uploading ${item.id}: ${idx + 1} / ${items.length}`);
			// upload
			const returnedItem: Bookmark = await this.remoteStorage.bookmarks.upload(item);
			// save to local
			await this.localStorage.bookmarks.put(returnedItem);
			yield syncState(this.collection, `uploaded ${item.id}.`);

		}

	}

	protected async *downloadNew(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `finding new items to be downloaded`);
		await sleep(500);

		const newIds: Entity[] = await this.findIdsToBeDownloaded();

		// return if none
		if (newIds.length === 0) {

			yield syncState(this.collection, `no new items to download.`);
			return;

		}

		// download all new
		yield syncState(this.collection, `${newIds.length} new items to be downloaded.`);
		yield* this.downloadNewItems(newIds);
		yield syncState(this.collection, `downloaded ${newIds.length} new items.`);

	}

	private async findIdsToBeDownloaded(): Promise<Entity[]> {

		const localSyncedIds: Set<UUID> = new Set(await this.localStorage.bookmarks.listIds());

		// find remote-new item IDs
		return this.remoteIds.filter(s => !localSyncedIds.has(s.id));

	}

	private async *downloadNewItems(newIds: Entity[]): AsyncGenerator<SyncEvent> {

		for (const entity of newIds) {

			await sleep(500);
			yield syncState(this.collection, `downloading item ${entity.id}.`);
			const item: Bookmark = await this.remoteStorage.bookmarks.downloadOne(entity.id);
			await this.localStorage.bookmarks.put(item);
			yield syncState(this.collection, `item ${entity.id} downloaded and saved.`);

		}

	}

	protected async *downloadDeleted(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `downloading deleted items info`);
		await sleep(500);

		// read all new items
		const ids: UUID[] = await this.findIdsToBeDeleted();

		// return if none
		if (ids.length === 0) {

			yield syncState(this.collection, `no items to be deleted locally.`);
			return;

		}

		// upload new items
		yield syncState(this.collection, `${ids.length} items to be deleted.`);
		yield* this.deleteLocalItems(ids);
		yield syncState(this.collection, `deleted ${ids.length} items.`);

	}

	private async findIdsToBeDeleted(): Promise<UUID[]> {

		// set of remote ids
		const set: Set<UUID> = new Set(this.remoteIds.map(e => e.id));
		
		// list of local ids
		const localIds: UUID[] = await this.localStorage.bookmarks.listIds();

		// find the difference
		return localIds.filter(id => !set.has(id));

	}

	private async *deleteLocalItems(ids: UUID[]): AsyncGenerator<SyncEvent> {

		for (const id of ids) {

			await sleep(500);
			yield syncState(this.collection, `deleting item ${id}.`);
			await this.localStorage.bookmarks.delete(id);
			yield syncState(this.collection, `item ${id} deleted locally.`);

		}

	}

	protected async *uploadDeleted(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `finding deleted items to be uploaded`);
		await sleep(500);

		// read all new items
		const items: Bookmark[] = await this.localStorage.bookmarks.list({ filterFn: b => !!b._deleted });

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no items deleted locally.`);
			return;

		}

		// upload new items
		yield syncState(this.collection, `${items.length} deleted items to be uploaded.`);
		yield* this.uploadDeletedItems(items);
		yield syncState(this.collection, `uploaded ${items.length} deleted items.`);

	}

	private async *uploadDeletedItems(items: Bookmark[]): AsyncGenerator<SyncEvent> {

		for (const [idx, item] of items.entries()) {

			await sleep(500);
			yield syncState(this.collection, `trashing ${item.id}: ${idx + 1} / ${items.length}`);
			// upload / trash
			await this.remoteStorage.bookmarks.trash(item);
			await this.localStorage.bookmarks.delete(item.id, true);
			yield syncState(this.collection, `trashed ${item.id}.`);

		}

	}


	protected async *downloadUpdated(): AsyncGenerator<SyncEvent> {



	}

	protected async *uploadUpdated(): AsyncGenerator<SyncEvent> {



	}

}
