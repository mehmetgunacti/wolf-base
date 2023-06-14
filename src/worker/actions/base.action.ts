import { UUID } from 'lib';
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

export abstract class BaseSyncAction<T extends Entity<T>> implements Action<void, AsyncGenerator<SyncEvent>> {

	protected localData: Map<UUID, Entity<T>> = new Map();
	protected remoteData: T[] = [];

	protected ids: T[] = [];

	constructor(
		protected collection: RemoteCollection,
		protected table: EntityTable<T>,
		protected remoteCollection: RemoteStorageCollection<T>
	) { }

	async *execute(): AsyncGenerator<SyncEvent> {

		console.log('execute()...');
		yield* this.loadIds();
		console.log('execute()...');
		// yield* this.handleLocallyDeleted();
		// yield* this.handleNew();
		yield* this.download();
		// yield* this.handleRemotelyDeleted();
		// yield* this.handleUpdated();
		yield* this.saveAll();

	}

	protected async *loadIds(): AsyncGenerator<SyncEvent> {

		yield syncState(this.collection, `downloading Ids...`);
		this.ids = await this.remoteCollection.list(true);
		yield syncState(this.collection, `${this.ids.length} Ids downloaded.`);

	}

	protected async *handleLocallyDeleted(): AsyncGenerator<SyncEvent> {

		await sleep(500);

	}

	protected async *handleRemotelyDeleted(): AsyncGenerator<SyncEvent> {

		await sleep(500);

	}

	protected async *handleNew(): AsyncGenerator<SyncEvent> {

		// const toBeUploaded: T[] = await this.table.list({ filterFn: (b) => !b.sync });
		// yield syncState(this.collection, `${toBeUploaded.length} new items detected.`);

		// for (const [idx, item] of toBeUploaded.entries()) {

		// 	yield syncState(this.collection, `uploading ${item.id}: ${idx + 1} / ${toBeUploaded.length}`);
		// 	const uploaded: T = await this.remoteCollection.create(item);
		// 	console.log(uploaded);
		// 	await this.table.update(item.id, uploaded);
		// 	await sleep(500);

		// }

	}

	protected async *download(): AsyncGenerator<SyncEvent> {

		// remoteData: Map<UUID, Entity<T>> = new Map();
		this.remoteData = await this.remoteCollection.list();
		await sleep(500);

	}

	protected async *handleUpdated(): AsyncGenerator<SyncEvent> {

		await sleep(500);

	}

	protected async *saveAll(): AsyncGenerator<SyncEvent> {

		await sleep(500);

		for (const item of this.remoteData)
			await this.table.put(item);
		yield syncState(this.collection, `${this.collection} ready.`);

	}

}
