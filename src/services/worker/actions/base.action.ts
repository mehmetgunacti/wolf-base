import {
	EntityTable,
	EntityBase,
	RemoteStorageCollection,
	SyncState,
	RemoteCollection,
	sleep,
	syncState
} from 'lib';

export interface Action<PARAM, RETURN_TYPE> {

	execute(vo?: PARAM): RETURN_TYPE;

}

export abstract class BaseSyncAction<T extends EntityBase> implements Action<void, AsyncGenerator<SyncState>> {

	// protected mapRemoteData: Map<string, IRemoteData<ID>>;

	constructor(
		protected collection: RemoteCollection,
		protected table: EntityTable<T>,
		protected remoteCollection: RemoteStorageCollection<T>
	) {
		// this.mapRemoteData = new Map();
	}

	async *execute(): AsyncGenerator<SyncState> {

		yield* this.handleLocallyDeleted();
		yield* this.handleNew();
		yield* this.download();
		yield* this.handleRemotelyDeleted();
		yield* this.handleUpdated();
		yield* this.saveAll();

	}

	protected async *handleLocallyDeleted(): AsyncGenerator<SyncState> {

		await sleep(500);

	}

	protected async *handleRemotelyDeleted(): AsyncGenerator<SyncState> {

		await sleep(500);

	}

	protected async *handleNew(): AsyncGenerator<SyncState> {

		await sleep(500);

	}

	protected async *download(): AsyncGenerator<SyncState> {


		await sleep(500);

	}

	protected async *handleUpdated(): AsyncGenerator<SyncState> {

		await sleep(500);

	}

	protected async *saveAll(): AsyncGenerator<SyncState> {

		await sleep(500);
		yield syncState(this.collection, undefined, `${this.collection} ready.`);

	}

}
