import { Entity, LocalStorageService, RemoteStorageService, UUID, isNewer, sleep, syncHeader, syncState } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { SyncEvent } from 'lib/models/sync.model';
import { Action } from './base.action';

export class BookmarksSyncAction implements Action<void, AsyncGenerator<SyncEvent>> {

	private collection = RemoteCollection.bookmarks;
	protected remoteEntities: Entity[] = [];

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

		}

	}

	protected async *checkConflicts(): AsyncGenerator<SyncEvent> {

		const conflicts: Bookmark[] = await this.localStorage.bookmarks.listConflicts();
		if (conflicts.length > 0)
			throw new ConflictDetectedError(conflicts.length);

	}

	protected async *downloadIds(): AsyncGenerator<SyncEvent> {

		await sleep(500);
		yield* syncHeader(this.collection, `downloading Ids...`);
		this.remoteEntities = await this.remoteStorage.bookmarks.downloadIds();
		yield syncState(this.collection, `${this.remoteEntities.length} Ids downloaded.`);

	}

	protected async *uploadNew(): AsyncGenerator<SyncEvent> {

		yield* syncHeader(this.collection, `Uploading new items`);
		await sleep(500);

		// read all new items
		const items: Bookmark[] = await this.localStorage.bookmarks.listNew();

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
			yield syncState(this.collection, `${idx + 1} / ${items.length}: uploading ['${item.id}', '${item.name}']`);

			// upload
			const returnedItem: Bookmark = await this.remoteStorage.bookmarks.upload(item);

			// save to local
			await this.localStorage.bookmarks.put(returnedItem);

			yield syncState(this.collection, `['${item.id}', '${item.name}'} done.`);

		}

	}

	protected async *downloadNew(): AsyncGenerator<SyncEvent> {

		yield* syncHeader(this.collection, `Finding new items to be downloaded`);
		await sleep(500);

		const newIds: Entity[] = await this.localStorage.bookmarks.removeExistingFrom(this.remoteEntities);

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

	private async *downloadNewItems(newIds: Entity[]): AsyncGenerator<SyncEvent> {

		for (const entity of newIds) {

			await sleep(500);
			yield syncState(this.collection, `downloading item [${entity.id}]}.`);
			const item: Bookmark = await this.remoteStorage.bookmarks.downloadOne(entity.id);
			await this.localStorage.bookmarks.put(item);
			yield syncState(this.collection, `[${entity.id}, '${item.name}'] done.`);

		}

	}

	protected async *uploadDeleted(): AsyncGenerator<SyncEvent> {

		yield* syncHeader(this.collection, `Finding deleted items to be uploaded`);
		await sleep(500);

		// find all deleted items
		const items: Bookmark[] = await this.localStorage.bookmarks.listDeleted();

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no items deleted locally.`);
			return;

		}

		// upload deleted items
		yield syncState(this.collection, `found ${items.length} deleted items to be uploaded.`);
		yield* this.uploadDeletedItems(items);
		yield syncState(this.collection, `${items.length} deleted items done.`);

	}

	private async *uploadDeletedItems(items: Bookmark[]): AsyncGenerator<SyncEvent> {

		for (const [idx, item] of items.entries()) {

			await sleep(500);
			yield syncState(this.collection, `${idx + 1} / ${items.length}: handling ['${item.id}', '${item.name}']`);

			if (!item.createTime) { // item is new (exists only on local)

				// upload local item to trash
				await this.remoteStorage.bookmarks.trash(item);

				// delete local item
				await this.localStorage.bookmarks.delete(item.id);

				yield syncState(this.collection, `['${item.id}', '${item.name}'} done.`);
				return;

			}

			// download remote item
			const remoteItem: Bookmark = await this.remoteStorage.bookmarks.downloadOne(item.id);

			// item should exist on server; 'updateTime' has to be set on local and remote item
			// if not, mark conflict
			if (!remoteItem?.updateTime || !item.updateTime || isNewer(remoteItem.updateTime, item.updateTime)) {

				// mark conflict
				await this.localStorage.bookmarks.markConflict(item.id);

				yield syncState(this.collection, `Conflict: ['${item.id}', '${item.name}'}.`);
				return;

			}

			// upload local item to trash
			await this.remoteStorage.bookmarks.trash(item);

			// delete remote item
			await this.remoteStorage.bookmarks.delete(remoteItem.id);

			// remove from entities list
			this.remoteEntities = this.remoteEntities.filter(entity => entity.id !== remoteItem.id);

			// delete local item
			await this.localStorage.bookmarks.delete(item.id);

			yield syncState(this.collection, `['${item.id}', '${item.name}'} done.`);

		}

	}

	protected async *downloadDeleted(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `downloading deleted items info`);
		await sleep(500);

		// read all new items
		const ids: UUID[] = await this.findRemotelyDeletedIds();

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

	private async findRemotelyDeletedIds(): Promise<UUID[]> {

		// set of remote ids
		const set: Set<UUID> = new Set(this.remoteEntities.map(e => e.id));

		// list of local ids
		const localIds: Entity[] = await this.localStorage.bookmarks.listEntities();

		// find the difference
		return localIds.filter(entity => entity.createTime && !set.has(entity.id)).map(e => e.id);

	}

	private async *deleteLocalItems(ids: UUID[]): AsyncGenerator<SyncEvent> {

		for (const id of ids) {

			await sleep(500);
			const item = await this.localStorage.bookmarks.get(id);
			await this.localStorage.bookmarks.delete(id);
			yield syncState(this.collection, `${id} ['${item?.name}'} deleted locally.`);

		}

	}

	protected async *uploadUpdated(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `finding locally updated items`);
		await sleep(500);

		// read all updated items
		const items: Bookmark[] = await this.localStorage.bookmarks.listUpdated();

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no items updated locally.`);
			return;

		}

		// upload new items
		yield syncState(this.collection, `${items.length} deleted items to be uploaded.`);
		yield* this.uploadUpdatedItems(items);
		yield syncState(this.collection, `uploaded ${items.length} deleted items.`);

	}

	private async *uploadUpdatedItems(items: Bookmark[]): AsyncGenerator<SyncEvent> {

		for (const [idx, item] of items.entries()) {

			await sleep(500);
			yield syncState(this.collection, `checking updated item ['${item.id}', '${item.name}']: ${idx + 1} / ${items.length}`);
			const remoteEntity = this.remoteEntities.find(e => e.id === item.id);

			// upload if updateTime properties are equal
			if (remoteEntity?.updateTime && item.updateTime && isNewer(remoteEntity.updateTime, item.updateTime)) {

				yield syncState(this.collection, `Conflict: ['${item.id}', '${item.name}']`);
				await this.localStorage.bookmarks.markConflict(item.id);
				return;

			}

			yield syncState(this.collection, `uploading ['${item.id}', '${item.name}']`);
			const uploaded = await this.remoteStorage.bookmarks.upload(item);
			await this.localStorage.bookmarks.put(uploaded);

		}

	}

	protected async *downloadUpdated(): AsyncGenerator<SyncEvent> {

		// todo recheck this logic
		yield* syncHeader(this.collection, `Finding remotely updated items`);
		await sleep(500);

		const items = await this.localStorage.bookmarks.removeSynchronousFrom(this.remoteEntities);

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no updated items on server.`);
			return;

		}

		yield syncState(this.collection, `found ${items.length} updated items.`);

		for (const [idx, item] of items.entries()) {

			const localEntity = await this.localStorage.bookmarks.get(item.id);
			yield syncState(this.collection, `${idx + 1} / ${items.length}: ['${item.id}', '${localEntity?.name}']`);
			await sleep(500);

			if (localEntity?._updated) {

				yield syncState(this.collection, `Conflict: ['${localEntity.id}', '${localEntity.name}']`);
				await this.localStorage.bookmarks.markConflict(localEntity.id);
				continue;

			}

			yield syncState(this.collection, `downloading remotely updated item ['${item.id}', '${localEntity?.name}']`);
			const remotelyUpdated = await this.remoteStorage.bookmarks.downloadOne(item.id);
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

			yield syncState(this.collection, `no clicked bookmarks.`);
			return;

		}

		yield syncState(this.collection, `found ${items.length} clicked bookmarks.`);

		for (const [idx, item] of items.entries()) {

			yield syncState(this.collection, `${idx + 1} / ${items.length}: uploading ${item.id} (${item.current} times clicked).`);
			this.remoteStorage.clicks.increase(item.id, item.current);

		}

		yield syncState(this.collection, `Clicked bookmark numbers uploaded`);

	}

	protected async *downloadClicks(): AsyncGenerator<SyncEvent> {

		// todo recheck this logic
		yield* syncHeader(this.collection, `Downloading bookmark click numbers`);
		await sleep(500);

		const items = await this.remoteStorage.clicks.downloadMany();

		// return if none
		if (items.length === 0) {

			yield syncState(this.collection, `no clicked bookmarks.`);
			return;

		}

		yield syncState(this.collection, `found ${items.length} clicked bookmarks.`);
		await this.localStorage.clicks.putAll(items);
		yield syncState(this.collection, `Clicked bookmark numbers downloaded`);

	}

}

class ConflictDetectedError extends Error {

	constructor(public count: number) {
		super('Conflicts detected');
		this.name = 'ConflictDetectedError';
	}

}