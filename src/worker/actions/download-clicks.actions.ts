import { Click } from "lib";
import { BaseAction } from "./base.action";

export class DownloadClicksAction extends BaseAction {

	async execute(): Promise<void> {

		// todo recheck this logic
		await this.localStorage.syncLog.title(this.syncLogId, this.collection, `Downloading all bookmark click numbers`);

		const clicks: Click[] = await this.remoteStorage.clicks.downloadMany();

		// return if none
		if (clicks.length === 0) {

			await this.localStorage.syncLog.log(this.syncLogId, this.collection, `no bookmark click data on server`);
			return;

		}

		await this.localStorage.syncLog.log(this.syncLogId, this.collection, `saving ${clicks.length} bookmark click data`);
		await this.localStorage.clicks.putAll(clicks);
		await this.localStorage.syncLog.log(this.syncLogId, this.collection, `${clicks.length} bookmark click data saved`);

	}

}