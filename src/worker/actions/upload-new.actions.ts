import { Bookmark, RemoteData, UUID } from "lib";
import { FatalError } from "worker/utils";
import { BaseAction } from "./base.action";

export class UploadNewAction extends BaseAction {

	async execute(): Promise<void> {

		await this.postService.header(this.collection, `Uploading new items`);

		// read all new items
		const ids: UUID[] = await this.localStorage.bookmarks.listNewIds();

		// return if none
		if (ids.length === 0) {

			await this.postService.message(this.collection, `no new items to upload`);
			return;

		}

		// upload new items
		await this.postService.header(this.collection, `${ids.length} new items to be uploaded`, false);
		await this.uploadNewItems(ids);
		await this.postService.header(this.collection, `uploaded ${ids.length} new items`, false);

	}

	private async uploadNewItems(ids: UUID[]): Promise<void> {

		for (const [idx, id] of ids.entries()) {

			// get local item
			const item = await this.localStorage.bookmarks.get(id);
			if (!item)
				throw new FatalError(`${id} not found in local table`);

			await this.postService.message(this.collection, `${idx + 1} / ${ids.length}: uploading ['${item.id}', '${item.name}']`);

			// upload
			const remoteData: RemoteData<Bookmark> = await this.remoteStorage.bookmarks.upload(item);

			// save to local
			await this.localStorage.bookmarks.put(remoteData);

			await this.postService.message(this.collection, `['${item.id}', '${item.name}'} done`);

		}

	}

}