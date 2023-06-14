import { Bookmark, SyncBookmark } from 'lib/models/bookmark.model';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { BookmarksTable } from 'lib/services/localstorage/local-storage-table.interface';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { SyncEvent } from 'lib/models/sync.model';
import { BaseSyncAction } from './base.action';
import { sleep } from 'lib';

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

	// protected override async *handleUpdated(): AsyncGenerator<SyncEvent> {

	// 	const clicked: Bookmark[] = await this.table.list({filterFn: b => (b.sync?.clicks ?? 0) > 0 });
	// 	const table: BookmarksTable = this.table as BookmarksTable;
	// 	// const clicked: IClick[] = await table.getClickedItems();
	// 	// yield syncState(RemoteCollection.clicks, SYNC_STATES.PROCESSING_CLICKS, `${clicked.length} bookmarks clicked.`);

	// 	const remote: BookmarksCollection = this.remoteCollection as BookmarksCollection;
	// 	for (const [idx, item] of clicked.entries()) {

	// 	// yield syncState(RemoteCollection.clicks, undefined, `uploading ${item.id}: ${idx + 1} / ${clicked.length}`);
	// 	await sleep(100);
	// 	await remote.increaseClicks(item.id, item.sync?.clicks ?? 0);
	// 	// 	await table.saveClick(clicks);

	// 	}
	// 	// await sleep(500);

	// 	yield* super.handleUpdated();

	// }

	// private async *downloadClicks(): AsyncGenerator<ISyncState> {

	// 	const table: BookmarksTable = this.table as BookmarksTable;
	// 	yield syncState(RemoteCollection.clicks, SYNC_STATES.PROCESSING_NEW, `downloading clicks...`);

	// 	const remoteData: IClick[] = await this.remoteCollectionClicks.list();
	// 	await table.saveClicks(remoteData);

	// 	yield syncState(RemoteCollection.clicks, undefined, `${remoteData.length} downloaded.`);

	// }

}
