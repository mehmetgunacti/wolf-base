import { Metadata } from "lib";
import { FatalError } from "worker/utils";
import { BaseAction } from "./base.action";

export class DownloadNewAction extends BaseAction {

	async execute(): Promise<void> {

		await this.localStorage.syncLog.title(this.syncLogId, this.collection, `Finding new items to be downloaded`);

		const newIds: Metadata[] = await this.localStorage.bookmarks.filterNew(this.remoteMetadata.getItems());

		// return if none
		if (newIds.length === 0) {

			await this.localStorage.syncLog.log(this.syncLogId,this.collection, `no new items to download`);
			return;

		}

		// download all new
		await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `${newIds.length} new items to be downloaded`);
		await this.downloadNewItems(newIds);
		await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `${newIds.length} items downloaded`);

	}

	private async downloadNewItems(newIds: Metadata[]): Promise<void> {

		for (const [idx, entity] of newIds.entries()) {

			await this.localStorage.syncLog.subtitle(this.syncLogId, this.collection, `${idx + 1} / ${newIds.length}: downloading item [${entity.id}]`);
			const remoteData = await this.remoteStorage.bookmarks.downloadOne(entity.id);
			if (!remoteData)
				throw new FatalError(`Could not download ${entity.id}`);
			await this.localStorage.bookmarks.put(remoteData);
			await this.localStorage.syncLog.log(this.syncLogId,this.collection, `[${entity.id}, '${remoteData.entity.name}'] downloaded`);

		}

	}

}