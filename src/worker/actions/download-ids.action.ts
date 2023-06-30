import { Action, RemoteCollection, RemoteMetadata, RemoteStorageService } from "lib";
import { MetadataList, PostService } from "worker/utils";

export class DownloadIdsAction implements Action<void, Promise<MetadataList>> {

	constructor(
		private remoteStorage: RemoteStorageService,
		private postService: PostService,
		private collection: RemoteCollection
	) { }

	async execute(): Promise<MetadataList> {

		this.postService.message(this.collection, `downloading Ids..`);
		const remoteMetaData = await this.remoteStorage.bookmarks.downloadIds();
		this.postService.message(this.collection, `${remoteMetaData.length} Ids downloaded`);
		return new MetadataList(remoteMetaData);

	}

}