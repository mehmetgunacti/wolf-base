import { UUID, WolfBaseDB, WolfBaseTableName } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Entity } from 'lib/models/entity.model';
import { SyncEvent } from 'lib/models/sync.model';
import { EntityTable } from 'lib/services/localstorage/local-storage-table.interface';
import { RemoteStorageCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { sleep } from 'lib/utils/helper.tool';
import { syncState } from 'lib/utils/sync.tool';

export interface Action<PARAM, RETURN_TYPE> {

	execute(vo?: PARAM): RETURN_TYPE;

}

export abstract class BaseSyncAction<T extends Entity> implements Action<void, AsyncGenerator<SyncEvent>> {

	// protected table: EntityTable<T>;

	protected localData: T[] = []; // Map<UUID, Entity<T>> = new Map();
	protected remoteIds: T[] = [];

	constructor(
		protected table: EntityTable<T>,
		protected collection: RemoteCollection,
		protected db: WolfBaseDB,
		protected tablename: WolfBaseTableName,
		protected remoteCollection: RemoteStorageCollection<T>
	) { }

	async *execute(): AsyncGenerator<SyncEvent> {

		yield* this.uploadNew();

		yield* this.downloadIds();

		yield* this.downloadNew();
		yield* this.downloadDeleted();

		yield* this.uploadDeleted();

		yield* this.uploadUpdated();
		yield* this.downloadUpdated();

	}

	protected async *uploadNew(): AsyncGenerator<SyncEvent> {

		// await sleep(500);
		// const newItems: T[] = await this.table.list({ filterFn: (b) => !b.sync });
		// if (newItems.length === 0) {

		// 	yield syncState(this.collection, `no new items to upload.`);
		// 	return;

		// }

		// yield syncState(this.collection, `${newItems.length} new items to be uploaded.`);
		// for (const [idx, item] of newItems.entries()) {

		// 	await sleep(500);
		// 	yield syncState(this.collection, `uploading ${item.id}: ${idx + 1} / ${newItems.length}`);
		// 	const uploaded: T = await this.remoteCollection.create(item);
		// 	await this.table.put(uploaded);

		// }

	}

	protected async *downloadNew(): AsyncGenerator<SyncEvent> {

		// await sleep(500);
		// yield syncState(this.collection, `finding new items to be downloaded`);
		// const localIds: Set<UUID> = new Set(this.localData.map(item => item.id));
		// const remoteIds: Set<UUID> = new Set();
		// for (const remoteItem of this.remoteIds) {

		// 	if (localIds.has(remoteItem.id))
		// 		continue;

		// 	await sleep(500);
		// 	yield syncState(this.collection, `downloading item with id ${remoteItem.id}.`);
		// 	const item: T = await this.remoteCollection.get(remoteItem.id);
		// 	remoteIds.add(item.id);

		// 	await sleep(500);
		// 	yield syncState(this.collection, `saving item with id ${remoteItem.id}.`);
		// 	await this.table.put(item);

		// }
		// yield syncState(this.collection, `downloaded ${remoteIds.size} new items.`);

	}

	protected async *downloadDeleted(): AsyncGenerator<SyncEvent> {

		// await sleep(500);
		// yield syncState(this.collection, `finding deleted items..`);
		// const deletedIds: Set<UUID> = new Set();
		// const remoteIds: Set<UUID> = new Set(this.remoteIds.map(item => item.id));
		// for (const item of this.localData) {

		// 	if (!item.sync) // item is new
		// 		continue;
			
		// 	if (remoteIds.has(item.id)) // not deleted
		// 		continue;
			
		// 	await sleep(500);
		// 	yield syncState(this.collection, `deleting item with id ${item.id}.`);
		// 	await this.table.delete(item.id);
		// 	deletedIds.add(item.id);

		// }
		// yield syncState(this.collection, `locally deleted ${deletedIds.size} items.`);

	}

	protected async *uploadDeleted(): AsyncGenerator<SyncEvent> {

	}

	protected async *downloadUpdated(): AsyncGenerator<SyncEvent> {



	}

	protected async *uploadUpdated(): AsyncGenerator<SyncEvent> {



	}

	protected async *downloadIds(): AsyncGenerator<SyncEvent> {

		await sleep(500);
		yield syncState(this.collection, `downloading Ids...`);
		this.remoteIds = await this.remoteCollection.list(true);
		yield syncState(this.collection, `${this.remoteIds.length} Ids downloaded.`);

		await sleep(500);
		yield syncState(this.collection, `preparing local data...`);
		this.localData = await this.table.list();
		yield syncState(this.collection, `${this.localData.length} items ready.`);

	}

}
