import { EntityTable } from 'lib/services/localstorage/local-storage-table.interface';
import { EntityBase } from 'lib/models/entity-base.model';
import { RemoteStorageCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { sleep } from 'lib/utils/helper.tool';
import { syncState } from 'lib/utils/sync.tool';
import { SYNC_STATES } from 'lib/constants/sync.constant';
import { SyncEvent } from 'lib/models/sync.model';

export interface Action<PARAM, RETURN_TYPE> {

	execute(vo?: PARAM): RETURN_TYPE;

}

export abstract class BaseSyncAction <T extends EntityBase> implements Action<void, AsyncGenerator<SyncEvent>> {

	// protected mapRemoteData: Map<string, IRemoteData<ID>>;

	constructor(
		protected collection: RemoteCollection,
		protected table: EntityTable<T>,
		protected remoteCollection: RemoteStorageCollection<T>
	) {
		// this.mapRemoteData = new Map();
	}

	async *execute(): AsyncGenerator<SyncEvent> {

		yield* this.handleLocallyDeleted();
		yield* this.handleNew();
		yield* this.download();
		yield* this.handleRemotelyDeleted();
		yield* this.handleUpdated();
		yield* this.saveAll();

	}

	protected async *handleLocallyDeleted(): AsyncGenerator<SyncEvent> {

		await sleep(500);

	}

	protected async *handleRemotelyDeleted(): AsyncGenerator<SyncEvent> {

		await sleep(500);

	}

	protected async *handleNew(): AsyncGenerator<SyncEvent> {

		await sleep(500);

	}

	protected async *download(): AsyncGenerator<SyncEvent> {


		await sleep(500);

	}

	protected async *handleUpdated(): AsyncGenerator<SyncEvent> {

		await sleep(500);

	}

	protected async *saveAll(): AsyncGenerator<SyncEvent> {

		await sleep(500);
		yield syncState(this.collection, SYNC_STATES.DOWNLOADING, `${this.collection} ready.`);

	}

}
