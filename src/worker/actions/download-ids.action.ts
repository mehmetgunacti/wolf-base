import { BaseAction } from "./base.action";

export class DownloadIdsAction extends BaseAction {

	async execute(): Promise<void> {

		this.postService.message(this.collection, `downloading Ids..`);
		const remoteIds = await this.remoteStorage.bookmarks.downloadIds();
		this.remoteMetadata.replace(remoteIds);
		this.postService.message(this.collection, `${remoteIds.length} Ids downloaded`);

	}

}