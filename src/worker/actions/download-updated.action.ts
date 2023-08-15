import { Metadata } from "lib";
import { FatalError } from "worker/utils";
import { BaseAction } from "./base.action";

export class DownloadUpdatedAction extends BaseAction {

	async execute(): Promise<void> {

		// todo recheck this logic
		await this.localStorage.syncLog.title(this.syncLogId, this.collection, `Finding remotely updated items`);

		const items: Metadata[] = await this.localStorage.bookmarks.filterUpdated(this.remoteMetadata.getItems());

		// return if none
		if (items.length === 0) {

			await this.localStorage.syncLog.log(this.syncLogId,this.collection, `no updated items on server`);
			return;

		}

		await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `${items.length} updated items to be downloaded`);
		await this.downloadUpdatedItems(items);
		await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `downloaded ${items.length} updated items`);

	}

	private async downloadUpdatedItems(items: Metadata[]): Promise<void> {

		for (const [idx, item] of items.entries()) {

			const localItem = await this.localStorage.bookmarks.getSyncData(item.id);
			if (!localItem)
				throw new FatalError(`${item.id} not found in local sync table`);

			await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `${idx + 1} / ${items.length}: ['${localItem.id}']`);

			const localEntity = await this.localStorage.bookmarks.get(localItem.id);
			if (!localEntity)
				throw new FatalError(`${localItem.id} not found in local table`);

			// mark as error if local item is updated or deleted
			if (localItem.updated || localItem.deleted) {

				const error = `Remotely updated item [${localItem.id}] cannot be downloaded. Local item is marked 'updated' or 'deleted'`;
				await this.localStorage.syncLog.log(this.syncLogId,this.collection, error);
				await this.localStorage.bookmarks.markError(localEntity.id, error);
				continue;

			}

			await this.localStorage.syncLog.log(this.syncLogId,this.collection, `downloading remotely updated item ['${localEntity.id}', '${localEntity.name}']`);
			const remotelyUpdated = await this.remoteStorage.bookmarks.downloadOne(item.id);
			if (!remotelyUpdated)
				throw new FatalError(`${item.id} not found in remote collection`);
			await this.localStorage.bookmarks.put(remotelyUpdated);

		}

	}

}