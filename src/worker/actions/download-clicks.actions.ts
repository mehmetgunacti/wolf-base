import { Action, LocalStorageService, RemoteCollection, RemoteStorageService } from "lib";
import { PostService } from "worker/utils";

export class DownloadClicksAction implements Action<void, Promise<void>> {

	constructor(
		private localStorage: LocalStorageService,
		private remoteStorage: RemoteStorageService,
		private postService: PostService,
		private collection: RemoteCollection
	) { }

	async execute(): Promise<void> {

		// todo recheck this logic
		this.postService.header(this.collection, `Downloading bookmark click numbers`);

		const items = await this.remoteStorage.clicks.downloadMany();

		// return if none
		if (items.length === 0) {

			this.postService.message(this.collection, `no clicked bookmarks`);
			return;

		}

		this.postService.header(this.collection, `${items.length} clicked bookmarks`, false);
		await this.localStorage.clicks.putAll(items);
		this.postService.header(this.collection, `${items.length} clicked bookmark numbers downloaded`, false);

	}

}