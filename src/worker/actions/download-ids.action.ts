import { MetadataList } from "worker/utils";
import { BaseAction } from "./base.action";

export class DownloadIdsAction extends BaseAction {

	async execute(): Promise<MetadataList> {

		this.postService.message(this.collection, `downloading Ids..`);
		const remoteMetaData = await this.remoteStorage.bookmarks.downloadIds();
		this.postService.message(this.collection, `${remoteMetaData.length} Ids downloaded`);
		return new MetadataList(remoteMetaData);

	}

}