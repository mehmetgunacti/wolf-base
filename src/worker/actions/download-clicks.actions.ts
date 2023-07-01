import { Action, Click, LocalStorageService, RemoteCollection, RemoteStorageService } from "lib";
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
		await this.postService.header(this.collection, `Downloading all bookmark click numbers`);

		const clicks: Click[] = await this.remoteStorage.clicks.downloadMany();

		// return if none
		if (clicks.length === 0) {

			await this.postService.message(this.collection, `no bookmark click data on server`);
			return;

		}

		await this.postService.header(this.collection, `saving ${clicks.length} bookmark click data`, false);
		await this.localStorage.clicks.putAll(clicks);
		await this.postService.header(this.collection, `${clicks.length} bookmark click data saved`, false);

	}

}