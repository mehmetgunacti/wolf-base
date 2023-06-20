import { LocalStorageService, RemoteStorageService, UUID, sleep, syncState } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { SyncDTO, SyncData, SyncEvent } from 'lib/models/sync.model';
import { Action } from './base.action';

export class BookmarksSyncAction implements Action<void, AsyncGenerator<SyncEvent>> {

	private collection = RemoteCollection.bookmarks;
	protected remoteIds: SyncData[] = [];

	constructor(
		protected localStorage: LocalStorageService,
		protected remoteStorage: RemoteStorageService
	) { }

	async *execute(): AsyncGenerator<SyncEvent> {

		yield* this.downloadIds();

		yield* this.uploadNew();


		yield* this.downloadNew();
		yield* this.downloadDeleted();

		yield* this.uploadDeleted();

		yield* this.uploadUpdated();
		yield* this.downloadUpdated();

	}

	protected async *uploadNew(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `finding new items to be uploaded`);
		await sleep(500);

		// all IDs (already synced and new)
		const allIds: UUID[] = await this.localStorage.bookmarks.listIds();

		// already synced IDs
		const localSyncData: SyncData[] = await this.localStorage.syncData.list();
		const remoteIds: Set<UUID> = new Set(localSyncData.map(s => s.id));

		// find newly created item IDs
		const newIds = allIds.filter(id => !remoteIds.has(id));

		// return if none
		if (newIds.length === 0) {

			yield syncState(this.collection, `no new items to upload.`);
			return;

		}

		// upload new items
		yield syncState(this.collection, `${newIds.length} new items to be uploaded.`);
		for (const [idx, itemId] of newIds.entries()) {

			await sleep(500);
			yield syncState(this.collection, `uploading ${itemId}: ${idx + 1} / ${newIds.length}`);
			const newItem = await this.localStorage.bookmarks.get(itemId);
			if (newItem) {
				const syncData = await this.remoteStorage.bookmarks.upload(newItem);
				await this.localStorage.syncData.put(syncData);
				yield syncState(this.collection, `uploaded ${itemId}.`);
			}

		}
		yield syncState(this.collection, `downloaded ${newIds.length} new items.`);

	}

	protected async *downloadNew(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `finding new items to be downloaded`);
		await sleep(500);

		// all local synced Ids
		const localSyncedIds: Set<UUID> = new Set(
			(await this.localStorage.syncData.list(RemoteCollection.bookmarks)).map(s => s.id)
		);

		// find remote-new item IDs
		const newIds = this.remoteIds.filter(s => !localSyncedIds.has(s.id));

		// return if none
		if (newIds.length === 0) {

			yield syncState(this.collection, `no new items to download.`);
			return;

		}

		// download all new
		yield syncState(this.collection, `${newIds.length} new items to be downloaded.`);
		for (const remoteSyncData of newIds) {

			await sleep(500);
			yield syncState(this.collection, `downloading item with id ${remoteSyncData.id}.`);
			const item: SyncDTO<Bookmark> = await this.remoteStorage.bookmarks.downloadOne(remoteSyncData.id);

			// save
			if (item.entity) {
				yield syncState(this.collection, `saving item with id ${remoteSyncData.id}.`);
				await this.localStorage.bookmarks.put(item.entity);
				await this.localStorage.syncData.put(item.syncData);
			}

		}
		yield syncState(this.collection, `downloaded ${newIds.length} new items.`);

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
		this.remoteIds = await this.remoteStorage.bookmarks.downloadIds();
		yield syncState(this.collection, `${this.remoteIds.length} Ids downloaded.`);

		// await sleep(500);
		// yield syncState(this.collection, `preparing local data...`);
		// this.localIds = await this.localStorage.syncData.list();
		// yield syncState(this.collection, `${this.localIds.length} items ready.`);

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
