import { BaseAction } from "./base.action";

export class DownloadIdsAction extends BaseAction {

	async execute(): Promise<void> {

		await this.localStorage.syncLog.title(this.syncLogId, this.collection, `downloading Ids..`);
		const remoteIds = await this.remoteStorage.bookmarks.downloadIds();
		this.remoteMetadata.setItems(remoteIds);
		await this.localStorage.syncLog.log(this.syncLogId,this.collection, `${remoteIds.length} Ids downloaded`);

	}

}