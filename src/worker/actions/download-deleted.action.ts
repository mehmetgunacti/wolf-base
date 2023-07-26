import { SyncData } from "lib";
import { BaseAction } from "./base.action";

export class DownloadDeletedAction extends BaseAction {

	async execute(): Promise<void> {

		await this.postService.header(this.collection, `Downloading deleted items info`);

		// read all new items
		const syncData: SyncData[] = await this.localStorage.bookmarks.filterDeleted(this.remoteMetadata.getItems());

		// return if none
		if (syncData.length === 0) {

			await this.postService.message(this.collection, `no items to be deleted locally`);
			return;

		}

		// upload new items
		await this.postService.header(this.collection, `${syncData.length} items to be deleted`, false);
		await this.markLocalItems(syncData);
		await this.postService.header(this.collection, `deleted ${syncData.length} items`, false);

	}

	private async markLocalItems(deletedItems: SyncData[]): Promise<void> {

		for (const [idx, syncData] of deletedItems.entries()) {

			await this.postService.header(this.collection, `${idx + 1} / ${deletedItems.length}: marking ['${syncData.id}'] as deleted`, false);
			await this.localStorage.bookmarks.markError(syncData.id, 'deleted on server');

		}

	}

}