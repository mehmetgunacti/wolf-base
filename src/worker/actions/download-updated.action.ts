import { SyncData } from "lib";
import { FatalError } from "worker/utils";
import { BaseAction } from "./base.action";

export class DownloadUpdatedAction extends BaseAction {

	async execute(): Promise<void> {

		// todo recheck this logic
		await this.postService.header(this.collection, `Finding remotely updated items`);

		const items: SyncData[] = await this.localStorage.bookmarks.filterUpdated(this.remoteMetadata.getList());

		// return if none
		if (items.length === 0) {

			await this.postService.message(this.collection, `no updated items on server`);
			return;

		}

		await this.postService.header(this.collection, `${items.length} updated items to be downloaded`, false);
		await this.downloadUpdatedItems(items);
		await this.postService.header(this.collection, `downloaded ${items.length} updated items`, false);

	}

	private async downloadUpdatedItems(items: SyncData[]): Promise<void> {

		for (const [idx, item] of items.entries()) {

			const localItem = await this.localStorage.bookmarks.getSyncData(item.id);
			if (!localItem)
				throw new FatalError(`${item.id} not found in local sync table`);

			await this.postService.header(this.collection, `${idx + 1} / ${items.length}: ['${localItem.id}']`, false);

			const localEntity = await this.localStorage.bookmarks.get(localItem.id);
			if (!localEntity)
				throw new FatalError(`${localItem.id} not found in local table`);

			// mark as conflict if local item is updated or deleted
			if (localItem.updated || localItem.deleted) {

				await this.postService.message(this.collection, `Conflict: ['${localEntity.id}', '${localEntity.name}']`);
				await this.localStorage.bookmarks.markConflict(localEntity.id);
				continue;

			}

			await this.postService.message(this.collection, `downloading remotely updated item ['${localEntity.id}', '${localEntity.name}']`);
			const remotelyUpdated = await this.remoteStorage.bookmarks.downloadOne(item.id);
			if (!remotelyUpdated)
				throw new FatalError(`${item.id} not found in remote collection`);
			await this.localStorage.bookmarks.put(remotelyUpdated);

		}

	}

}