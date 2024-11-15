import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { IdBase } from '@models/id-base.model';
import { IndexedDbConfiguration } from '@models/indexeddb.model';
import { indexedDbConfiguration } from './wolfbase.database';

function version(conf: IndexedDbConfiguration): number {

	return Math.max(...Object.keys(conf.upgrades).map(key => parseInt(key)));

}

function assertStores(stores: string[]): asserts stores is DbStore[] {

	for (const store of stores)
		if (!Object.values(DbStore).includes(store as DbStore))
			throw new Error(`Invalid store: ${store}`);

}

function onUpgradeNeeded(event: IDBVersionChangeEvent, conf: IndexedDbConfiguration, reject: (reason?: any) => void): void {

	try {

		console.info(`IndexedDb: Upgrading from v${event.oldVersion} to v${event.newVersion}`);
		Object
			.keys(conf.upgrades)
			.map(key => parseInt(key))
			.filter(key => key > event.oldVersion)
			.flatMap(key => conf.upgrades[ key ])
			.map(command => { console.info(command); return command; })
			.forEach(command => command.execute(event));
		console.info(`IndexedDb: Upgrade successful.`);

	} catch (error) {

		const message = `Error during database upgrade: ${error}`;
		console.error(message);
		const request = event.target as IDBOpenDBRequest;
		const ts = request.transaction as IDBTransaction;
		ts.abort();
		reject(message);

	}

}

function put<T extends IdBase>(store: IDBObjectStore, entity: T): Promise<void> {

	return new Promise(

		(resolve, reject): void => {

			// database operation
			const request = store.put(entity);
			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);

		}

	);

}

function read<T extends IdBase>(store: IDBObjectStore, id: UUID): Promise<T | null> {

	return new Promise(

		(resolve, reject): void => {

			const request = store.get(id);
			request.onsuccess = () => resolve(request.result ?? null);
			request.onerror = () => reject(request.error);

		}

	);

}

export class TransactionManager {

	constructor(private tx: IDBTransaction) { }

	private getStore(storeName: DbStore): IDBObjectStore {

		return this.tx.objectStore(storeName);

	}

	add<T>(storeName: DbStore, item: Partial<T>): Promise<T> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise(

			(resolve, reject): void => {

				const request = store.add(item);
				request.onsuccess = () => resolve({ ...item, id: request.result } as T);
				request.onerror = () => reject(request.error);

			}

		);

	}

	put<T extends IdBase>(storeName: DbStore, entity: T): Promise<void> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return put(store, entity);

	}

	async bulkPut<T extends IdBase>(storeName: DbStore, entities: T[]): Promise<void> {

		// lookup store
		const store = this.getStore(storeName);

		// iterate
		for (const entity of entities)
			await put(store, entity);

	}

	read<T extends IdBase>(storeName: DbStore, id: UUID): Promise<T | null> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return read(store, id);

	}

	readAll<T>(storeName: DbStore): Promise<T[]> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise(

			(resolve, reject): void => {

				const request = store.getAll();
				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject(request.error);

			}

		);

	}

	readAllKeys(storeName: DbStore): Promise<UUID[]> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			const request = store.getAllKeys();
			request.onsuccess = () => resolve(request.result as unknown as UUID[]);
			request.onerror = () => reject(request.error);

		});

	}

	dump(storeName: DbStore): Promise<Record<string, any>> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			const records: Record<string, any> = {};
			const request = store.openCursor();
			// note: the onsuccess event handler is called each time cursor.continue() is called
			// no "while" loop needed
			request.onsuccess = (event: Event) => {

				const cursor: IDBCursorWithValue = request.result as IDBCursorWithValue;
				if (cursor) {

					records[ cursor.key as string ] = cursor.value ?? null;
					cursor.continue();

				} else
					return resolve(records);

			};
			request.onerror = () => reject(request.error);

		});

	}

	size(storeName: DbStore): Promise<number> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			let size = 0;

			const request = store.openCursor();
			// note: the onsuccess event handler is called each time cursor.continue() is called
			// no "while" loop needed
			request.onsuccess = (event: Event) => {

				const cursor: IDBCursorWithValue = request.result as IDBCursorWithValue;
				if (cursor) {

					size += JSON.stringify(cursor.value).length;
					cursor.continue();

				} else
					resolve(size);

			};
			request.onerror = () => reject(request.error);

		});

	}

	readValue<T>(storeName: DbStore, key: string): Promise<T> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise(

			(resolve, reject): void => {

				const request = store.get(key);
				request.onsuccess = () => resolve(request.result as T);
				request.onerror = () => reject(request.error);

			}

		);

	}

	setValue<T>(storeName: DbStore, key: string, value: T): Promise<void> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise(

			(resolve, reject): void => {

				const request = store.put(value, key);
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);

			}

		);

	}

	async modify<T extends IdBase>(storeName: DbStore, id: UUID, data: Partial<T>): Promise<T | null> {

		// lookup store
		const store = this.getStore(storeName);

		// read entity
		const entity: T | null = await read(store, id);
		if (!entity)
			return null;

		// updated
		const updated: T = { ...entity, ...data };

		// return promise
		return new Promise(

			(resolve, reject) => {

				const request = store.put(updated);
				request.onsuccess = () => resolve(updated);
				request.onerror = () => reject(request.error);

			}

		);

	}

	delete(storeName: DbStore, id: UUID): Promise<void> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			const request = store.delete(id);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);

		});

	}

	empty(storeName: DbStore): Promise<void> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			const request = store.clear();
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);

		});

	}

	count(storeName: DbStore): Promise<number> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			const request = store.count();
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);

		});

	}

}

class IndexedDbImpl implements IndexedDb {

	private idbDatabase: IDBDatabase | null = null;
	private _init = new Promise<void>((resolve, reject) => {

		if (this.idbDatabase) {
			resolve();
			return;
		}

		console.info(`Initializing IndexedDb...`);
		let idbDatabase: IDBDatabase | null = null;
		const conf: IndexedDbConfiguration = indexedDbConfiguration;
		const request: IDBOpenDBRequest = indexedDB.open(conf.dbName, version(conf));
		request.onerror = (event: Event) => reject(`IndexedDB: Error opening database: ${(event.target as IDBRequest).error}`);
		request.onblocked = () => reject('IndexedDB: Database blocked, please close other tabs with this site open.');
		request.onupgradeneeded = (event: IDBVersionChangeEvent) => onUpgradeNeeded(event, conf, reject);
		request.onsuccess = (event: Event) => {

			idbDatabase = (event.target as IDBOpenDBRequest).result;
			idbDatabase.onversionchange = () => {

				const message = 'IndexedDB: Other connection is trying to upgrade the database, closing this connection';
				console.error(message);
				idbDatabase?.close();
				idbDatabase = null;
				reject(message);

			};
			this.idbDatabase = idbDatabase;
			resolve();
			console.info(`...IndexedDb initialized.`);

		};

	});

	init(): Promise<void> {

		return this._init;

	}

	add<T>(storeName: DbStore, item: Partial<T>): Promise<T> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.add(storeName, item)

		);

	}

	put<T extends IdBase>(storeName: DbStore, entity: T): Promise<void> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.put(storeName, entity)

		);

	}

	bulkPut<T extends IdBase>(storeName: DbStore, entities: T[]): Promise<void> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.bulkPut(storeName, entities)

		);

	}

	read<T extends IdBase>(storeName: DbStore, id: UUID): Promise<T | null> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.read(storeName, id)

		);

	}

	readValue<T>(storeName: DbStore, key: string): Promise<T> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.readValue(storeName, key)

		);

	}

	setValue<T>(storeName: DbStore, key: string, value: T): Promise<void> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.setValue(storeName, key, value)

		);

	}

	readAll<T>(storeName: DbStore): Promise<T[]> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.readAll(storeName)

		);

	}

	readAllKeys(storeName: DbStore): Promise<UUID[]> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.readAllKeys(storeName)

		);

	}

	dump(storeName: DbStore): Promise<Record<string, any>> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.dump(storeName)

		);

	}

	modify<T extends IdBase>(storeName: DbStore, id: UUID, data: Partial<T>): Promise<T | null> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.modify(storeName, id, data)

		);

	}

	delete(storeName: DbStore, id: UUID): Promise<void> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.delete(storeName, id)

		);

	}

	empty(storeName: DbStore): Promise<void> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.empty(storeName)

		);

	}

	count(storeName: DbStore): Promise<number> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.count(storeName)

		);

	}

	size(storeName: DbStore): Promise<number> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.size(storeName)

		);

	}

	async transaction<T>(

		mode: IDBTransactionMode,
		stores: string[],
		operations: (transactionManager: TransactionManager) => Promise<T>

	): Promise<T> {

		assertStores(stores);
		await this.init();
		if (!this.idbDatabase)
			throw new Error('Database not initialized');

		const tx = this.idbDatabase.transaction(stores, mode);
		const txManager = new TransactionManager(tx);
		return await operations(txManager);

	}

}

export class LocalDatabase {

	private static instance: IndexedDb | null = null;

	private constructor() { }

	static getInstance(): IndexedDb {

		if (LocalDatabase.instance === null) {
			try {
				LocalDatabase.instance = new IndexedDbImpl();
			} catch (error) {
				console.error(error);
				throw error;
			}
		}
		return LocalDatabase.instance;

	}

}
