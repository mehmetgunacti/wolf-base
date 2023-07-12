import { BaseAction } from "./base.action";

export class DownloadIdsAction extends BaseAction {

	async execute(): Promise<void> {

		await this.postService.header(this.collection, `downloading Ids..`);
		const remoteIds = await this.remoteStorage.bookmarks.downloadIds();
		this.remoteMetadata.setItems(remoteIds);
		await this.postService.message(this.collection, `${remoteIds.length} Ids downloaded`);

	}

}