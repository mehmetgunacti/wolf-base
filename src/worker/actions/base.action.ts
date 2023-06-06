import {
	EntityTable,
	EntityBase,
	RemoteStorageCollection,
	SyncEvent,
	RemoteCollection,
	sleep,
	syncState,
	SYNC_STATES
} from 'lib';

export interface Action<PARAM, RETURN_TYPE> {

	execute(vo?: PARAM): RETURN_TYPE;

}

export abstract class BaseSyncAction<T extends EntityBase> implements Action<void, AsyncGenerator<SyncEvent>> {

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
