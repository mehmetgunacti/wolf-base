import { SyncData } from "lib";
import { FatalError } from "worker/utils";
import { BaseAction } from "./base.action";

export class DownloadNewAction extends BaseAction {

	async execute(): Promise<void> {

		this.postService.header(this.collection, `Finding new items to be downloaded`);

		const newIds: SyncData[] = await this.localStorage.bookmarks.filterNew(this.remoteMetadata.getList());

		// return if none
		if (newIds.length === 0) {

			this.postService.message(this.collection, `no new items to download`);
			return;

		}

		// download all new
		this.postService.header(this.collection, `${newIds.length} new items to be downloaded`, false);
		this.downloadNewItems(newIds);
		this.postService.header(this.collection, `${newIds.length} items downloaded`, false);

	}

	private async downloadNewItems(newIds: SyncData[]): Promise<void> {

		for (const [idx, entity] of newIds.entries()) {

			this.postService.header(this.collection, `${idx + 1} / ${newIds.length}: downloading item [${entity.id}]`, false);
			const remoteData = await this.remoteStorage.bookmarks.downloadOne(entity.id);
			if (!remoteData)
				throw new FatalError(`Could not download ${entity.id}`);
			await this.localStorage.bookmarks.put(remoteData);
			this.postService.message(this.collection, `[${entity.id}, '${remoteData.entity.name}'] downloaded`);

		}

	}

}