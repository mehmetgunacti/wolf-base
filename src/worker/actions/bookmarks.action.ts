import { Entity, LocalStorageService, RemoteStorageService, UUID, isNewer, sleep, syncState } from 'lib';
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
		this.remoteEntities = await this.remoteStorage.bookmarks.downloadIds();
		yield syncState(this.collection, `${this.remoteEntities.length} Ids downloaded.`);

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
			yield syncState(this.collection, `uploading ['${item.id}', '${item.name}']: ${idx + 1} / ${items.length}`);
			// upload
			const returnedItem: Bookmark = await this.remoteStorage.bookmarks.upload(item);
			// save to local
			await this.localStorage.bookmarks.put(returnedItem);
			yield syncState(this.collection, `uploaded ['${item.id}', '${item.name}'}.`);

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
		return this.remoteEntities.filter(s => !localSyncedIds.has(s.id));

	}

	private async *downloadNewItems(newIds: Entity[]): AsyncGenerator<SyncEvent> {

		for (const entity of newIds) {

			await sleep(500);
			yield syncState(this.collection, `downloading item ${entity.id} ['${entity.name}'}.`);
			const item: Bookmark = await this.remoteStorage.bookmarks.downloadOne(entity.id);
			await this.localStorage.bookmarks.put(item);
			yield syncState(this.collection, `item ${entity.id} ['${item.name}'} downloaded and saved.`);

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
		const localIds: UUID[] = await this.localStorage.bookmarks.listIds();

		// find the difference
		return localIds.filter(id => !set.has(id));

	}

	private async *deleteLocalItems(ids: UUID[]): AsyncGenerator<SyncEvent> {

		for (const id of ids) {

			await sleep(500);
			const item = await this.localStorage.bookmarks.get(id);
			yield syncState(this.collection, `deleting item ${id} ['${item?.name}'}.`);
			await this.localStorage.bookmarks.delete(id);
			yield syncState(this.collection, `item ${id} ['${item?.name}'} deleted locally.`);

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
			yield syncState(this.collection, `trashing ['${item.id}', '${item.name}']: ${idx + 1} / ${items.length}`);

			// trash local item (upload)
			await this.remoteStorage.bookmarks.trash(item);

			// delete local item
			await this.localStorage.bookmarks.delete(item.id);

			// if item exists on remote server..
			if (item.createTime) {

				// download remote item
				const remoteItem: Bookmark = await this.remoteStorage.bookmarks.downloadOne(item.id);
				if (remoteItem) { // should always be true

					// delete remotely
					await this.remoteStorage.bookmarks.delete(item.id);

					// remove from entities list
					this.remoteEntities = this.remoteEntities.filter(entity => entity.id !== item.id);

					// trash (upload) in case remote item is more up-to-date
					if (remoteItem.updateTime && item.updateTime) // always true
						if (isNewer(remoteItem.updateTime ?? '', item.updateTime))
							await this.remoteStorage.bookmarks.trash(remoteItem);

				}

			}
			yield syncState(this.collection, `trashed ['${item.id}', '${item.name}'}.`);

		}

	}

	protected async *downloadUpdated(): AsyncGenerator<SyncEvent> {

		// todo recheck this logic
		yield syncState(this.collection, `finding remotely updated items`);
		await sleep(500);

		const localEntities = await this.localStorage.bookmarks.listEntities();
		const mapLocalEntites = new Map(localEntities.map(e => [e.id, e]));

		for (const [idx, item] of this.remoteEntities.entries()) {

			const localEntity = mapLocalEntites.get(item.id);
			yield syncState(this.collection, `checking item ['${item.id}', '${localEntity?.name}']: ${idx + 1} / ${this.remoteEntities.length}`);
			await sleep(500);

			if (localEntity?._updated && item.updateTime && localEntity?.updateTime && isNewer(item.updateTime, localEntity?.updateTime)) {

				yield syncState(this.collection, `Conflict detected! Marking local item ['${localEntity.id}', '${localEntity.name}']`);
				await this.localStorage.bookmarks.markConflict(localEntity.id);

			} else {

				yield syncState(this.collection, `Downloading remotely updated item ['${item.id}', '${localEntity?.name}']`);
				const remotelyUpdated = await this.remoteStorage.bookmarks.downloadOne(item.id);
				await this.localStorage.bookmarks.put(remotelyUpdated);

			}

		}


	}

	protected async *uploadUpdated(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `finding locally updated items`);
		await sleep(500);

		// read all updated items
		const items: Bookmark[] = await this.localStorage.bookmarks.list({ filterFn: b => !!b._updated });

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
			if (remoteEntity && remoteEntity.updateTime && item.updateTime && remoteEntity.updateTime === item.updateTime) {

				yield syncState(this.collection, `uploading ['${item.id}', '${item.name}']`);
				const uploaded = await this.remoteStorage.bookmarks.upload(item);
				await this.localStorage.bookmarks.put(uploaded);

			} else { // else mark as conflict

				yield syncState(this.collection, `Conflict detected! Marking local item ['${item.id}', '${item.name}']`);
				await this.localStorage.bookmarks.markConflict(item.id);

			}

		}

	}

}
