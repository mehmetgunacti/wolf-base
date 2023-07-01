import { SyncData } from "lib";
import { MetadataList } from "worker/utils";
import { BaseAction } from "./base.action";

export class UploadUpdatedAction extends BaseAction {

	async execute(): Promise<void> {

		this.postService.header(this.collection, `Finding locally updated items`);

		// read all updated items
		const items: SyncData[] = await this.localStorage.bookmarks.listUpdated();

		// return if none
		if (items.length === 0) {

			this.postService.message(this.collection, `no items updated locally`);
			return;

		}

		// upload new items
		this.postService.header(this.collection, `${items.length} updated items to be uploaded`, false);
		await this.uploadUpdatedItems(this.remoteMetadata ,items);
		this.postService.header(this.collection, `uploaded ${items.length} updated items`, false);

	}

	private async uploadUpdatedItems(remoteMetadata: MetadataList, items: SyncData[]): Promise<void> {

		for (const [idx, item] of items.entries()) {

			this.postService.header(this.collection, `${idx + 1} / ${items.length}: checking updated item ['${item.id}']`, false);

			// item.id should be in previously downloaded remote items list
			const remoteItem = remoteMetadata.find(s => s.id === item.id);
			if (!remoteItem) {

				this.postService.message(this.collection, `Conflict: ['${item.id}']`);
				await this.localStorage.bookmarks.markConflict(item.id);
				continue;

			}

			const localItem = await this.localStorage.bookmarks.get(item.id);
			if (!localItem) {

				this.postService.message(this.collection, `Conflict: ['${item.id}']`);
				await this.localStorage.bookmarks.markConflict(item.id);
				continue;

			}

			// upload if both timestamps are equal
			if (remoteItem.updateTime === item.updateTime) {

				this.postService.message(this.collection, `uploading ['${localItem.id}', '${localItem.name}']`);
				const uploaded = await this.remoteStorage.bookmarks.upload(localItem);
				await this.localStorage.bookmarks.put(uploaded);

			}

			// else mark conflict
			this.postService.message(this.collection, `Conflict: ['${localItem.id}', '${localItem.name}']`);
			await this.localStorage.bookmarks.markConflict(item.id);

		}

	}

}