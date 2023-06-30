import { Action, Bookmark, LocalStorageService, RemoteCollection, RemoteMetadata, RemoteStorageService } from "lib";
import { MetadataList, PostService } from "worker/utils";

export class UploadDeletedAction implements Action<MetadataList, Promise<void>> {

	constructor(
		private localStorage: LocalStorageService,
		private remoteStorage: RemoteStorageService,
		private postService: PostService,
		private collection: RemoteCollection
	) { }

	async execute(remoteMetadata: MetadataList): Promise<void> {

		this.postService.header(this.collection, `Finding deleted items to be uploaded`);

		// find all deleted items
		const items: Bookmark[] = await this.localStorage.bookmarks.listDeletedItems();

		// return if none
		if (items.length === 0) {

			this.postService.message(this.collection, `no items deleted locally`);
			return;

		}

		// upload deleted items
		this.postService.header(this.collection, `${items.length} deleted items to be uploaded`, false);
		await this.uploadDeletedItems(remoteMetadata.getList(), items);
		this.postService.header(this.collection, `${items.length} deleted items done`, false);

	}

	private async uploadDeletedItems(remoteMetaData: RemoteMetadata[], items: Bookmark[]): Promise<void> {

		for (const [idx, item] of items.entries()) {

			this.postService.header(this.collection, `${idx + 1} / ${items.length}: handling ['${item.id}', '${item.name}']`, false);

			// if item has syncdata it was synchronized before
			const localSyncData = await this.localStorage.bookmarks.getSyncData(item.id);
			if (!localSyncData) { // item is new (exists only on local)

				await this.handleDeletedItem(item);
				continue;

			}

			// lookup remoteData in previously downloaded list
			const remoteSyncData = remoteMetaData.find(s => s.id = item.id);
			if (!remoteSyncData) { // item was deleted on another client

				await this.handleDeletedItem(item);
				continue;

			}

			// if same version on server
			if (remoteSyncData.updateTime === localSyncData.updateTime) {

				// delete remote item
				await this.remoteStorage.bookmarks.delete(remoteSyncData.id);

				// remove from entities list
				remoteMetaData = remoteMetaData.filter(entity => entity.id !== remoteSyncData.id);

				await this.handleDeletedItem(item);
				continue;

			}

			// ... else mark conflict
			await this.localStorage.bookmarks.markConflict(item.id);
			this.postService.message(this.collection, `Conflict: ['${item.id}', '${item.name}']`);

		}

	}

	private async handleDeletedItem(item: Bookmark): Promise<void> {

		// upload local item to trash
		await this.remoteStorage.bookmarks.trash(item);

		// delete local item from trash and from sync
		await this.localStorage.bookmarks.deletePermanently(item.id);

		this.postService.message(this.collection, `['${item.id}', '${item.name}'] done`);

	}

}