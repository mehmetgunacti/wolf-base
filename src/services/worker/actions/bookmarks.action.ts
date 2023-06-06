import {
	Bookmark,
	BookmarksCollection,
	BookmarksTable,
	RemoteCollection,
	SyncEvent
} from 'lib';
import { BaseSyncAction } from './base.action';

export class BookmarksSyncAction extends BaseSyncAction<Bookmark> {

	constructor(
		table: BookmarksTable,
		remoteCollection: BookmarksCollection
	) {
		super(RemoteCollection.bookmarks, table, remoteCollection);
	}

	override async *execute(): AsyncGenerator<SyncEvent> {

		yield* super.execute();
		// yield* this.downloadClicks();

	}

	protected override async *handleUpdated(): AsyncGenerator<SyncEvent> {

		const table: BookmarksTable = this.table as BookmarksTable;
		// const clicked: IClick[] = await table.getClickedItems();
		// yield syncState(RemoteCollection.clicks, SYNC_STATES.PROCESSING_CLICKS, `${clicked.length} bookmarks clicked.`);

		// for (const [idx, item] of clicked.entries()) {

		// 	yield syncState(RemoteCollection.clicks, undefined, `uploading ${item.id}: ${idx + 1} / ${clicked.length}`);
		// 	await sleep(100);
		// 	const clicks = await this.remoteCollectionClicks.increase(item.id, item);
		// 	await table.saveClick(clicks);

		// }
		// await sleep(500);

		yield* super.handleUpdated();

	}

	// private async *downloadClicks(): AsyncGenerator<ISyncState> {

	// 	const table: BookmarksTable = this.table as BookmarksTable;
	// 	yield syncState(RemoteCollection.clicks, SYNC_STATES.PROCESSING_NEW, `downloading clicks...`);

	// 	const remoteData: IClick[] = await this.remoteCollectionClicks.list();
	// 	await table.saveClicks(remoteData);

	// 	yield syncState(RemoteCollection.clicks, undefined, `${remoteData.length} downloaded.`);

	// }

}
