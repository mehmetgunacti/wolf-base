import { LocalStorageService, RemoteStorageService, Trash, UUID, WolfBaseTableName, sleep, syncState } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { SyncEvent } from 'lib/models/sync.model';
import { Action } from './base.action';

export class BookmarksSyncAction implements Action<void, AsyncGenerator<SyncEvent>> {

	private collection = RemoteCollection.bookmarks;
	protected localData: Bookmark[] = []; // Map<UUID, Entity<T>> = new Map();
	protected remoteIds: Bookmark[] = [];

	constructor(
		protected localStorage: LocalStorageService,
		protected remoteStorage: RemoteStorageService
	) { }

	async *execute(): AsyncGenerator<SyncEvent> {

		yield* this.uploadNew();

		yield* this.downloadIds();

		yield* this.downloadNew();
		yield* this.downloadDeleted();

		yield* this.uploadDeleted();

		yield* this.uploadUpdated();
		yield* this.downloadUpdated();

	}

	protected async *uploadNew(): AsyncGenerator<SyncEvent> {

		// await sleep(500);
		// const newItems: Bookmark[] = await this.localStorage.bookmarks.list({ filterFn: (b) => !b.sync });
		// if (newItems.length === 0) {

		// 	yield syncState(this.collection, `no new items to upload.`);
		// 	return;

		// }

		// yield syncState(this.collection, `${newItems.length} new items to be uploaded.`);
		// for (const [idx, item] of newItems.entries()) {

		// 	await sleep(500);
		// 	yield syncState(this.collection, `uploading ${item.id}: ${idx + 1} / ${newItems.length}`);
		// 	const uploaded: Bookmark = await this.remoteStorage.bookmarks.create(item);
		// 	await this.localStorage.bookmarks.update(uploaded);

		// }

	}

	protected async *downloadNew(): AsyncGenerator<SyncEvent> {

		// await sleep(500);
		// yield syncState(this.collection, `finding new items to be downloaded`);
		// const localIds: Set<UUID> = new Set(this.localData.map(item => item.id));
		// const remoteIds: Set<UUID> = new Set();
		// for (const remoteItem of this.remoteIds) {

		// 	if (localIds.has(remoteItem.id))
		// 		continue;

		// 	await sleep(500);
		// 	yield syncState(this.collection, `downloading item with id ${remoteItem.id}.`);
		// 	const item: Bookmark = await this.remoteStorage.bookmarks.get(remoteItem.id);
		// 	remoteIds.add(item.id);

		// 	await sleep(500);
		// 	yield syncState(this.collection, `saving item with id ${remoteItem.id}.`);
		// 	await this.localStorage.bookmarks.put(item);

		// }
		// yield syncState(this.collection, `downloaded ${remoteIds.size} new items.`);

	}

	protected async *downloadDeleted(): AsyncGenerator<SyncEvent> {

		// await sleep(500);
		// yield syncState(this.collection, `deleting items locally..`);
		// const deletedIds: Set<UUID> = new Set();
		// const remoteIds: Set<UUID> = new Set(this.remoteIds.map(item => item.id));
		// for (const item of this.localData) {

		// 	if (!item.sync) // item is new
		// 		continue;

		// 	if (remoteIds.has(item.id)) // not deleted
		// 		continue;

		// 	await sleep(500);
		// 	yield syncState(this.collection, `deleting item with id ${item.id}.`);
		// 	await this.localStorage.bookmarks.delete(item.id);
		// 	deletedIds.add(item.id);

		// }
		// yield syncState(this.collection, `locally deleted ${deletedIds.size} items.`);

	}

	protected async *uploadDeleted(): AsyncGenerator<SyncEvent> {

		// await sleep(500);
		// yield syncState(this.collection, `deleting items remotely..`);
		// let count = 0;
		// const deletedItems: Trash[] = await this.localStorage.trashcan.list(item => item.table === WolfBaseTableName.bookmarks);
		// const remoteIds: Set<UUID> = new Set(this.remoteIds.map(item => item.id));
		// for (const item of deletedItems) {

		// 	if (remoteIds.has(item.id)) { // not deleted

		// 		await this.remoteStorage.bookmarks.delete(item.id);
		// 		await this.remoteStorage.trashcan.put(item);

		// 	}
		// 	await this.localStorage.trashcan.delete(item.id);
		// 	await sleep(500);
		// 	count++;

		// }
		// yield syncState(this.collection, `locally deleted ${count} items.`);

	}

	protected async *downloadUpdated(): AsyncGenerator<SyncEvent> {



	}

	protected async *uploadUpdated(): AsyncGenerator<SyncEvent> {



	}

	protected async *downloadIds(): AsyncGenerator<SyncEvent> {

		await sleep(500);
		yield syncState(this.collection, `downloading Ids...`);
		this.remoteIds = await this.remoteStorage.bookmarks.list(true);
		yield syncState(this.collection, `${this.remoteIds.length} Ids downloaded.`);

		await sleep(500);
		yield syncState(this.collection, `preparing local data...`);
		this.localData = await this.localStorage.bookmarks.list();
		yield syncState(this.collection, `${this.localData.length} items ready.`);

	}

}

// export const bookmarkActionFactory: Action = () => new BookmarksSyncAction();



	// protected override async *handleUpdated(): AsyncGenerator<SyncEvent> {

	// 	const clicked: Bookmark[] = await this.table.list({filterFn: b => (b.sync?.clicks ?? 0) > 0 });
	// 	const table: BookmarksTable = this.table as BookmarksTable;
	// 	// const clicked: IClick[] = await table.getClickedItems();
	// 	// yield syncState(RemoteCollection.clicks, SYNC_STATES.PROCESSING_CLICKS, `${clicked.length} bookmarks clicked.`);

	// 	const remote: BookmarksCollection = this.remoteCollection as BookmarksCollection;
	// 	for (const [idx, item] of clicked.entries()) {

	// 	// yield syncState(RemoteCollection.clicks, undefined, `uploading ${item.id}: ${idx + 1} / ${clicked.length}`);
	// 	await sleep(100);
	// 	await remote.increaseClicks(item.id, item.sync?.clicks ?? 0);
	// 	// 	await table.saveClick(clicks);

	// 	}
	// 	// await sleep(500);

	// 	yield* super.handleUpdated();

	// }

	// private async *downloadClicks(): AsyncGenerator<ISyncState> {

	// 	const table: BookmarksTable = this.table as BookmarksTable;
	// 	yield syncState(RemoteCollection.clicks, SYNC_STATES.PROCESSING_NEW, `downloading clicks...`);

	// 	const remoteData: IClick[] = await this.remoteCollectionClicks.list();
	// 	await table.saveClicks(remoteData);

	// 	yield syncState(RemoteCollection.clicks, undefined, `${remoteData.length} downloaded.`);

	// }
