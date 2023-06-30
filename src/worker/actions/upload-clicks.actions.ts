import { Action, LocalStorageService, RemoteCollection, RemoteStorageService } from "lib";
import { PostService } from "worker/utils";

export class UploadClicksAction implements Action<void, Promise<void>> {

	constructor(
		private localStorage: LocalStorageService,
		private remoteStorage: RemoteStorageService,
		private postService: PostService,
		private collection: RemoteCollection
	) { }

	async execute(): Promise<void> {

		// todo recheck this logic
		this.postService.header(this.collection, `Uploading clicked bookmark numbers`);

		const items = await this.localStorage.clicks.clicked();

		// return if none
		if (items.length === 0) {

			this.postService.message(this.collection, `no clicked bookmarks`);
			return;

		}

		this.postService.message(this.collection, `found ${items.length} clicked bookmarks`);

		for (const [idx, item] of items.entries()) {

			this.postService.header(this.collection, `${idx + 1} / ${items.length}: uploading ${item.id} (${item.current} times clicked)`, false);
			this.remoteStorage.clicks.increase(item.id, item.current);

		}

		this.postService.message(this.collection, `${items.length} clicked bookmark numbers uploaded`);

	}

}