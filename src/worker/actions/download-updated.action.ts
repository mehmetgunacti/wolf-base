import { Metadata } from "lib";
import { BaseAction } from "./base.action";

export class DownloadUpdatedAction extends BaseAction {

	async execute(): Promise<void> {

		// todo recheck this logic
		await this.localStorage.syncLog.title(this.syncLogId, this.collection, `Finding remotely updated items`);

		const items: Metadata[] = await this.localStorage.bookmarks.filterUpdated(this.remoteMetadata.getItems());

		// return if none
		if (items.length === 0) {

			await this.localStorage.syncLog.log(this.syncLogId,this.collection, `no updated items on server`);
			return;

		}

		await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `${items.length} updated items to be marked locally`);
		await this.markUpdatedItems(items);
		await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `marked ${items.length} updated items`);

	}

	private async markUpdatedItems(items: Metadata[]): Promise<void> {

		for (const [idx, item] of items.entries()) {

			const error = `Newer version on server`;
			await this.localStorage.syncLog.log(this.syncLogId,this.collection, `marking local item ['${item.id}']`);
			await this.localStorage.bookmarks.markError(item.id, error);

		}

	}

}