import { BaseAction } from "./base.action";

export class UploadClicksAction extends BaseAction {

	async execute(): Promise<void> {

		// todo recheck this logic
		await this.localStorage.syncLog.title(this.syncLogId, this.collection, `Uploading clicked bookmark numbers`);

		const items = await this.localStorage.clicks.clicked();

		// return if none
		if (items.length === 0) {

			await this.localStorage.syncLog.log(this.syncLogId, this.collection, `no clicked bookmarks`);
			return;

		}

		await this.localStorage.syncLog.log(this.syncLogId, this.collection, `found ${items.length} clicked bookmarks`);

		for (const [idx, item] of items.entries()) {

			await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `${idx + 1} / ${items.length}: uploading ${item.id} (${item.current} times clicked)`);
			await this.remoteStorage.clicks.increase(item.id, item.current);

		}

		await this.localStorage.syncLog.log(this.syncLogId, this.collection, `${items.length} bookmark click data uploaded`);

	}

}