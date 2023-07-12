import { Action, LocalStorageService, RemoteCollection, RemoteStorageService } from "lib";
import { PostService } from "worker/utils";

export class UploadClicksAction implements Action<void, Promise<void>> {

	private collection: RemoteCollection = RemoteCollection.bookmarks_clicks;

	constructor(
		private localStorage: LocalStorageService,
		private remoteStorage: RemoteStorageService,
		private postService: PostService
	) { }

	async execute(): Promise<void> {

		// todo recheck this logic
		await this.postService.header(this.collection, `Uploading clicked bookmark numbers`);

		const items = await this.localStorage.clicks.clicked();

		// return if none
		if (items.length === 0) {

			await this.postService.message(this.collection, `no clicked bookmarks`);
			return;

		}

		await this.postService.message(this.collection, `found ${items.length} clicked bookmarks`);

		for (const [idx, item] of items.entries()) {

			await this.postService.header(this.collection, `${idx + 1} / ${items.length}: uploading ${item.id} (${item.current} times clicked)`, false);
			await this.remoteStorage.clicks.increase(item.id, item.current);

		}

		await this.postService.message(this.collection, `${items.length} clicked bookmark numbers uploaded`);

	}

}