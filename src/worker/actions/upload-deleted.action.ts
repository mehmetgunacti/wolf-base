import { Bookmark } from "lib";
import { BaseAction } from "./base.action";

export class UploadDeletedAction extends BaseAction {

	async execute(): Promise<void> {

		await this.postService.header(this.collection, `Finding deleted items to be uploaded`);

		// find all deleted items
		const items: Bookmark[] = await this.localStorage.bookmarks.listDeletedItems();

		// return if none
		if (items.length === 0) {

			await this.postService.message(this.collection, `no items deleted locally`);
			return;

		}

		// upload deleted items
		await this.postService.header(this.collection, `${items.length} deleted items to be uploaded`, false);
		await this.uploadDeletedItems(items);
		await this.postService.header(this.collection, `${items.length} deleted items done`, false);

	}

	private async uploadDeletedItems(items: Bookmark[]): Promise<void> {

		for (const [idx, item] of items.entries()) {

			await this.postService.header(this.collection, `${idx + 1} / ${items.length}: handling ['${item.id}', '${item.name}']`, false);

			// if item has syncdata it was synchronized before
			const localSyncData = await this.localStorage.bookmarks.getSyncData(item.id);
			if (!localSyncData) { // item is new (exists only on local)

				await this.postService.message(this.collection, `'${item.id}' was newly created / never synchronized`);
				await this.handleDeletedItem(item);
				continue;

			}

			// lookup remoteData in previously downloaded list
			const remoteSyncData = this.remoteMetadata.get(item.id);
			if (!remoteSyncData) { // item was deleted on another client, too

				await this.postService.message(this.collection, `'${item.id}' was deleted on another client, too`);
				await this.handleDeletedItem(item);
				continue;

			}

			// if same version on server
			if (remoteSyncData.updateTime === localSyncData.updateTime) {

				// delete remote item
				await this.remoteStorage.bookmarks.delete(remoteSyncData.id);

				await this.handleDeletedItem(item);
				continue;

			}

			// ... else mark error
			const error = `Deleted item [${item.id}] cannot be uploaded: updateTime values do not match [r: ${remoteSyncData.updateTime}, l: ${localSyncData.updateTime}]`;
			await this.localStorage.bookmarks.markError(item.id, error);
			await this.postService.message(this.collection, `Deleted item [${item.id}] cannot be uploaded: updateTime values do not match [r: ${remoteSyncData.updateTime}, l: ${localSyncData.updateTime}]`);

		}

	}

	private async handleDeletedItem(item: Bookmark): Promise<void> {

		// upload local item to trash
		await this.remoteStorage.bookmarks.trash(item);

		// delete local item from trash and from sync
		await this.localStorage.bookmarks.deletePermanently(item.id);

		// remove from downloaded list
		this.remoteMetadata.remove(item.id);

		await this.postService.message(this.collection, `['${item.id}', '${item.name}'] done`);

	}

}