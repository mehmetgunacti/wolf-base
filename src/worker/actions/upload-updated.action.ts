import { SyncData } from "lib";
import { BaseAction } from "./base.action";

export class UploadUpdatedAction extends BaseAction {

	async execute(): Promise<void> {

		await this.postService.header(this.collection, `Finding locally updated items`);

		// read all updated items
		const items: SyncData[] = await this.localStorage.bookmarks.listUpdated();

		// return if none
		if (items.length === 0) {

			await this.postService.message(this.collection, `no items updated locally`);
			return;

		}

		// upload new items
		await this.postService.header(this.collection, `${items.length} updated items to be uploaded`, false);
		await this.uploadUpdatedItems(items);
		await this.postService.header(this.collection, `uploaded ${items.length} updated items`, false);

	}

	private async uploadUpdatedItems(items: SyncData[]): Promise<void> {

		for (const [idx, item] of items.entries()) {

			await this.postService.header(this.collection, `${idx + 1} / ${items.length}: checking updated item ['${item.id}']`, false);

			// item.id should be in previously downloaded remote items list
			const remoteItem = this.remoteMetadata.get(item.id);
			if (!remoteItem) {

				const error = `Updated item [${item.id}] cannot be uploaded: id ${item.id} is not in previously downloaded remote items list`;
				await this.postService.message(this.collection, error);
				await this.localStorage.bookmarks.markError(item.id, error);
				continue;

			}

			const localItem = await this.localStorage.bookmarks.get(item.id);
			if (!localItem) {

				const error = `Updated item [${item.id}] cannot be uploaded: ${item.id} is not in local storage table`;
				await this.postService.message(this.collection, error);
				await this.localStorage.bookmarks.markError(item.id, error);
				continue;

			}

			// upload if both timestamps are equal
			if (remoteItem.updateTime === item.updateTime) {

				await this.postService.message(this.collection, `uploading ['${localItem.id}', '${localItem.name}']`);
				const uploaded = await this.remoteStorage.bookmarks.upload(localItem);
				await this.localStorage.bookmarks.put(uploaded);
				this.remoteMetadata.set(uploaded.metaData);
				continue;

			}

			// else mark error
			const error = `Updated item [${item.id}] cannot be uploaded: timestamps do not match [${remoteItem.updateTime} and ${item.updateTime}]`;
			await this.postService.message(this.collection, error);
			await this.localStorage.bookmarks.markError(item.id, error);

		}

	}

}