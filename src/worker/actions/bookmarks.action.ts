import { LocalStorageService, RemoteData, RemoteMetaData, RemoteStorageService, SyncData, SyncEvent, UUID, isNewer, sleep, syncHeader, syncState } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { Action } from './base.action';

export class BookmarksSyncAction implements Action<void, AsyncGenerator<SyncEvent>> {

	private collection = RemoteCollection.bookmarks;
	protected remoteMetaData: RemoteMetaData[] = [];

	constructor(
		protected localStorage: LocalStorageService,
		protected remoteStorage: RemoteStorageService
	) { }

	async *execute(): AsyncGenerator<SyncEvent> {

		try {

			// order is important
			yield* this.checkConflicts();
			yield* this.uploadNew();
			yield* this.downloadIds();
			yield* this.downloadNew();
			yield* this.uploadDeleted();
			yield* this.downloadDeleted();
			yield* this.uploadUpdated();
			yield* this.downloadUpdated();
			yield* this.uploadClicks();
			yield* this.downloadClicks();

		} catch (error) {

			if (error instanceof ConflictDetectedError)
				yield syncState(this.collection, `${error.count} conflicts detected!`);

			else if (error instanceof FatalError)
				yield syncState(this.collection, `Fatal error!`);

		}

	}

	protected async *checkConflicts(): AsyncGenerator<SyncEvent> {

		const conflicts: SyncData[] = await this.localStorage.bookmarks.listConflicts();
		if (conflicts.length > 0)
			throw new ConflictDetectedError(conflicts.length);

	}

	protected async *downloadIds(): AsyncGenerator<SyncEvent> {

		await sleep(500);
		yield* syncHeader(this.collection, `downloading Ids..`);
		this.remoteMetaData = await this.remoteStorage.bookmarks.downloadIds();
		yield syncState(this.collection, `${this.remoteMetaData.length} Ids downloaded`);

	}

	protected async *uploadNew(): AsyncGenerator<SyncEvent> {

		yield* syncHeader(this.collection, `Uploading new items`);
		await sleep(500);

		// read all new items
		const ids: UUID[] = await this.localStorage.bookmarks.listNewIds();

		// return if none
		if (ids.length === 0) {

			yield syncState(this.collection, `no new items to upload`);
			return;

		}

		// upload new items
		yield syncState(this.collection, `${ids.length} new items to be uploaded`);
		yield* this.uploadNewItems(ids);
		yield syncState(this.collection, `uploaded ${ids.length} new items`);

	}

	private async *uploadNewItems(ids: UUID[]): AsyncGenerator<SyncEvent> {

		for (const [idx, id] of ids.entries()) {

			await sleep(500);
			const item = await this.localStorage.bookmarks.get(id);
			if (!item)
				throw new FatalError(`${id} not found in local table`);

			yield syncState(this.collection, `${idx + 1} / ${ids.length}: uploading ['${item.id}', '${item.name}']`);

			// upload
			const remoteData: RemoteData<Bookmark> = await this.remoteStorage.bookmarks.upload(item);

			// save to local
			await this.localStorage.bookmarks.put(remoteData);

			yield syncState(this.collection, `['${item.id}', '${item.name}'} done`);

		}

	}

	protected async *downloadNew(): AsyncGenerator<SyncEvent> {

		yield* syncHeader(this.collection, `Finding new items to be downloaded`);
		await sleep(500);

		const newIds: SyncData[] = await this.localStorage.bookmarks.filterNew(this.remoteMetaData);

		// return if none
		if (newIds.length === 0) {

			yield syncState(this.collection, `no new items to download`);
			return;

		}

		// download all new
		yield* syncHeader(this.collection, `${newIds.length} new items to be downloaded`, false);
		yield* this.downloadNewItems(newIds);
		yield* syncHeader(this.collection, `${newIds.length} items downloaded`, false);

	}

	private async *downloadNewItems(newIds: SyncData[]): AsyncGenerator<SyncEvent> {

		for (const [idx, entity] of newIds.entries()) {

			await sleep(500);
			yield* syncHeader(this.collection, `${idx + 1} / ${newIds.length}: downloading item [${entity.id}]`, false);
			const remoteData = await this.remoteStorage.bookmarks.downloadOne(entity.id);
			if (!remoteData)
				throw new FatalError(`Could not download ${entity.id}`);
			await this.localStorage.bookmarks.put(remoteData);
			yield syncState(this.collection, `[${entity.id}, '${remoteData.entity.name}'] downloaded`);

		}

	}

	protected async *uploadDeleted(): AsyncGenerator<SyncEvent> {

		yield* syncHeader(this.collection, `Finding deleted items to be uploaded`);
		await sleep(500);

		// find all deleted items
		const items: Bookmark[] = await this.localStorage.bookmarks.listDeletedItems();

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no items deleted locally`);
			return;

		}

		// upload deleted items
		yield* syncHeader(this.collection, `${items.length} deleted items to be uploaded`, false);
		yield* this.uploadDeletedItems(items);
		yield* syncHeader(this.collection, `${items.length} deleted items done`, false);

	}

	private async *uploadDeletedItems(items: Bookmark[]): AsyncGenerator<SyncEvent> {

		for (const [idx, item] of items.entries()) {

			await sleep(500);
			yield* syncHeader(this.collection, `${idx + 1} / ${items.length}: handling ['${item.id}', '${item.name}']`, false);

			// if item has syncdata it was synchronized before
			const localSyncData = await this.localStorage.bookmarks.getSyncData(item.id);
			if (!localSyncData) { // item is new (exists only on local)

				yield* this.handleDeletedItem(item);
				continue;

			}

			// lookup remoteData in previously downloaded list
			const remoteSyncData = this.remoteMetaData.find(s => s.id = item.id);
			if (!remoteSyncData) { // item was deleted on another client

				yield* this.handleDeletedItem(item);
				continue;

			}

			// if same version on server
			if (remoteSyncData.updateTime === localSyncData.updateTime) {

				// delete remote item
				await this.remoteStorage.bookmarks.delete(remoteSyncData.id);

				// remove from entities list
				this.remoteMetaData = this.remoteMetaData.filter(entity => entity.id !== remoteSyncData.id);

				yield* this.handleDeletedItem(item);
				continue;

			}

			// ... else mark conflict
			await this.localStorage.bookmarks.markConflict(item.id);
			yield syncState(this.collection, `Conflict: ['${item.id}', '${item.name}']`);

		}

	}

	private async *handleDeletedItem(item: Bookmark): AsyncGenerator<SyncEvent> {

		// upload local item to trash
		await this.remoteStorage.bookmarks.trash(item);

		// delete local item from trash and from sync
		await this.localStorage.bookmarks.deletePermanently(item.id);

		yield syncState(this.collection, `['${item.id}', '${item.name}'] done`);

	}

	protected async *downloadDeleted(): AsyncGenerator<SyncEvent> {

		yield* syncHeader(this.collection, `Downloading deleted items info`);
		await sleep(500);

		// read all new items
		const syncData: SyncData[] = await this.localStorage.bookmarks.filterDeleted(this.remoteMetaData);

		// return if none
		if (syncData.length === 0) {

			yield syncState(this.collection, `no items to be deleted locally`);
			return;

		}

		// upload new items
		yield* syncHeader(this.collection, `${syncData.length} items to be deleted`, false);
		yield* this.deleteLocalItems(syncData);
		yield* syncHeader(this.collection, `deleted ${syncData.length} items`, false);

	}

	private async *deleteLocalItems(deletedItems: SyncData[]): AsyncGenerator<SyncEvent> {

		for (const [idx, syncData] of deletedItems.entries()) {

			await sleep(500);
			yield* syncHeader(this.collection, `${idx + 1} / ${deletedItems.length}: handling ['${syncData.id}']`, false);

			if (syncData.updated || syncData.deleted) {

				await this.localStorage.bookmarks.markConflict(syncData.id);
				yield syncState(this.collection, `Conflict: ['${syncData.id}']`);
				continue;

			}

			const item = await this.localStorage.bookmarks.get(syncData.id);
			if (!item)
				throw new FatalError(`${syncData.id} not found in local table`);

			await this.localStorage.bookmarks.deletePermanently(syncData.id);
			yield syncState(this.collection, `['${item.id}', '${item.name}'] deleted locally`);

		}

	}

	protected async *uploadUpdated(): AsyncGenerator<SyncEvent> {

		yield* syncHeader(this.collection, `Finding locally updated items`);
		await sleep(500);

		// read all updated items
		const items: SyncData[] = await this.localStorage.bookmarks.listUpdated();

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no items updated locally`);
			return;

		}

		// upload new items
		yield* syncHeader(this.collection, `${items.length} updated items to be uploaded`, false);
		yield* this.uploadUpdatedItems(items);
		yield* syncHeader(this.collection, `uploaded ${items.length} updated items`, false);

	}

	private async *uploadUpdatedItems(items: SyncData[]): AsyncGenerator<SyncEvent> {

		for (const [idx, item] of items.entries()) {

			await sleep(500);
			yield* syncHeader(this.collection, `${idx + 1} / ${items.length}: checking updated item ['${item.id}']`, false);

			// item.id should be in previously downloaded remote items list
			const remoteItem = this.remoteMetaData.find(s => s.id = item.id);
			if (!remoteItem) {

				yield syncState(this.collection, `Conflict: ['${item.id}']`);
				await this.localStorage.bookmarks.markConflict(item.id);
				continue;

			}

			const localItem = await this.localStorage.bookmarks.get(item.id);
			if (!localItem) {

				yield syncState(this.collection, `Conflict: ['${item.id}']`);
				await this.localStorage.bookmarks.markConflict(item.id);
				continue;

			}

			// upload if both timestamps are equal
			if (remoteItem.updateTime === item.updateTime) {

				yield syncState(this.collection, `uploading ['${localItem.id}', '${localItem.name}']`);
				const uploaded = await this.remoteStorage.bookmarks.upload(localItem);
				await this.localStorage.bookmarks.put(uploaded);

			}

			// else mark conflict
			yield syncState(this.collection, `Conflict: ['${localItem.id}', '${localItem.name}']`);
			await this.localStorage.bookmarks.markConflict(item.id);

		}

	}

	protected async *downloadUpdated(): AsyncGenerator<SyncEvent> {

		// todo recheck this logic
		yield* syncHeader(this.collection, `Finding remotely updated items`);
		await sleep(500);

		const items: SyncData[] = await this.localStorage.bookmarks.filterUpdated(this.remoteMetaData);

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no updated items on server`);
			return;

		}

		yield* syncHeader(this.collection, `${items.length} updated items to be downloaded`, false);
		yield* this.downloadUpdatedItems(items);
		yield* syncHeader(this.collection, `downloaded ${items.length} updated items`, false);

	}

	private async *downloadUpdatedItems(items: SyncData[]): AsyncGenerator<SyncEvent> {

		for (const [idx, item] of items.entries()) {
			
			await sleep(500);
			const localItem = await this.localStorage.bookmarks.getSyncData(item.id);
			if (!localItem)
				throw new FatalError(`${item.id} not found in local sync table`);

			yield* syncHeader(this.collection, `${idx + 1} / ${items.length}: ['${localItem.id}']`, false);

			const localEntity = await this.localStorage.bookmarks.get(localItem.id);
			if (!localEntity)
				throw new FatalError(`${localItem.id} not found in local table`);

			// mark as conflict if local item is updated or deleted
			if (localItem.updated || localItem.deleted) {

				yield syncState(this.collection, `Conflict: ['${localEntity.id}', '${localEntity.name}']`);
				await this.localStorage.bookmarks.markConflict(localEntity.id);
				continue;

			}

			yield syncState(this.collection, `downloading remotely updated item ['${localEntity.id}', '${localEntity.name}']`);
			const remotelyUpdated = await this.remoteStorage.bookmarks.downloadOne(item.id);
			if (!remotelyUpdated)
				throw new FatalError(`${item.id} not found in remote collection`);
			await this.localStorage.bookmarks.put(remotelyUpdated);

		}

	}

	protected async *uploadClicks(): AsyncGenerator<SyncEvent> {

		// todo recheck this logic
		yield* syncHeader(this.collection, `Uploading clicked bookmark numbers`);
		await sleep(500);

		const items = await this.localStorage.clicks.clicked();

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no clicked bookmarks`);
			return;

		}

		yield syncState(this.collection, `found ${items.length} clicked bookmarks`);

		for (const [idx, item] of items.entries()) {

			yield syncState(this.collection, `${idx + 1} / ${items.length}: uploading ${item.id} (${item.current} times clicked)`);
			this.remoteStorage.clicks.increase(item.id, item.current);

		}

		yield syncState(this.collection, `${items.length} clicked bookmark numbers uploaded`);

	}

	protected async *downloadClicks(): AsyncGenerator<SyncEvent> {

		// todo recheck this logic
		yield* syncHeader(this.collection, `Downloading bookmark click numbers`);
		await sleep(500);

		const items = await this.remoteStorage.clicks.downloadMany();

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no clicked bookmarks`);
			return;

		}

		yield* syncHeader(this.collection, `${items.length} clicked bookmarks`, false);
		await this.localStorage.clicks.putAll(items);
		yield* syncHeader(this.collection, `${items.length} clicked bookmark numbers downloaded`, false);

	}

}

class ConflictDetectedError extends Error {

	constructor(public count: number) {
		super('Conflicts detected');
		this.name = 'ConflictDetectedError';
	}

}

class FatalError extends Error {

	constructor(message: string) {
		super('Fatal error');
		this.name = 'FatalError';
		this.message = message;
	}

}