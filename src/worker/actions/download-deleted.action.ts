import { SyncData } from "lib";
import { FatalError } from "worker/utils";
import { BaseAction } from "./base.action";

export class DownloadDeletedAction extends BaseAction {

	async execute(): Promise<void> {

		await this.postService.header(this.collection, `Downloading deleted items info`);

		// read all new items
		const syncData: SyncData[] = await this.localStorage.bookmarks.filterDeleted(this.remoteMetadata.getList());

		// return if none
		if (syncData.length === 0) {

			await this.postService.message(this.collection, `no items to be deleted locally`);
			return;

		}

		// upload new items
		await this.postService.header(this.collection, `${syncData.length} items to be deleted`, false);
		await this.deleteLocalItems(syncData);
		await this.postService.header(this.collection, `deleted ${syncData.length} items`, false);

	}

	private async deleteLocalItems(deletedItems: SyncData[]): Promise<void> {

		for (const [idx, syncData] of deletedItems.entries()) {

			await this.postService.header(this.collection, `${idx + 1} / ${deletedItems.length}: handling ['${syncData.id}']`, false);

			if (syncData.updated || syncData.deleted) {

				await this.localStorage.bookmarks.markError(syncData.id);
				await this.postService.message(this.collection, `Error: ['${syncData.id}']`);
				continue;

			}

			const item = await this.localStorage.bookmarks.get(syncData.id);
			if (!item)
				throw new FatalError(`${syncData.id} not found in local table`);

			await this.localStorage.bookmarks.deletePermanently(syncData.id);
			await this.postService.message(this.collection, `['${item.id}', '${item.name}'] deleted locally`);

		}

	}


}