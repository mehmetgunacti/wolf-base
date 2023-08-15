import { SyncData } from "lib";
import { BaseAction } from "./base.action";

export class DownloadDeletedAction extends BaseAction {

	async execute(): Promise<void> {

		await this.localStorage.syncLog.title(this.syncLogId, this.collection, `Downloading deleted items info`);

		// read all new items
		const syncData: SyncData[] = await this.localStorage.bookmarks.filterDeleted(this.remoteMetadata.getItems());

		// return if none
		if (syncData.length === 0) {

			await this.localStorage.syncLog.log(this.syncLogId,this.collection, `no items to be deleted locally`);
			return;

		}

		// upload new items
		await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `${syncData.length} items to be deleted`);
		await this.markLocalItems(syncData);
		await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `deleted ${syncData.length} items`);

	}

	private async markLocalItems(deletedItems: SyncData[]): Promise<void> {

		for (const [idx, syncData] of deletedItems.entries()) {

			await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `${idx + 1} / ${deletedItems.length}: marking ['${syncData.id}'] as deleted`);
			await this.localStorage.bookmarks.markError(syncData.id, 'deleted on server');

		}

	}

}