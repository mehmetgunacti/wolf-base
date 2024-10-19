import { computed, inject, signal, WritableSignal } from '@angular/core';
import { TStore, UUID } from '@constants';
import { IDBase } from '@models';
import { DATABASE_CONFIG } from '@services';
import { IndexedDbConfiguration } from 'lib/models/indexeddb.model';

function handleUpgrade(vce: IDBVersionChangeEvent, conf: IndexedDbConfiguration, errors: WritableSignal<string[]>): void {

	try {

		Object
			.keys(conf.upgrades)
			.map(key => parseInt(key))
			.filter(key => key > vce.oldVersion)
			.flatMap(key => conf.upgrades[ key ])
			.map(command => { console.info(command); return command; })
			.forEach(command => command.execute(vce));

	} catch (error) {

		const msg = `Error during database upgrade: ${error}`;
		errors.update(e => [ ...e, msg ]);
		console.error('Error during database upgrade:', error);
		const request = vce.target as IDBOpenDBRequest;
		const ts = request.transaction as IDBTransaction;
		ts.abort();
		throw error;

	}

}

class TransactionManager {

	constructor(private tx: IDBTransaction) { }

	private getStore(storeName: TStore): IDBObjectStore {

		return this.tx.objectStore(storeName);

	}

	put<T extends IDBase>(storeName: TStore, entity: T): Promise<void> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise(

			(resolve, reject): void => {

				// database operation
				const request = store.put(entity);
				request.onsuccess = () => resolve();
				request.onerror = () => reject(request.error);

			}

		);

	}

	async modify<T extends IDBase>(storeName: TStore, id: UUID, data: Partial<T>): Promise<T> {

		// lookup store
		const store = this.getStore(storeName);

		// read entity
		const entity: T = await this.read(storeName, id);

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

	read<T extends IDBase>(storeName: TStore, id: UUID): Promise<T> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise(

			(resolve, reject): void => {

				const request = store.get(id);
				request.onsuccess = () => resolve(request.result);
				request.onerror = () => reject(request.error);

			}

		);

	}

	readAll<T extends IDBase>(storeName: TStore): Promise<T[]> {

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

	readAllKeys(storeName: TStore): Promise<UUID[]> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			const request = store.getAllKeys();
			request.onsuccess = () => resolve(request.result as unknown as UUID[]);
			request.onerror = () => reject(request.error);

		});

	}

	dump(storeName: TStore): Promise<Record<string, any>> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			const records: Record<string, any> = {};

			const request = store.openCursor();
			request.onsuccess = (event: Event) => {

				const cursor: IDBCursorWithValue = request.result as IDBCursorWithValue;
				if (cursor) {

					records[ cursor.key as string ] = cursor.value;
					cursor.continue();

				}
				return resolve(records);

			};
			request.onerror = () => reject(request.error);

		});

	}

	size(storeName: TStore): Promise<number> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			let size = 0;

			const request = store.openCursor();
			request.onsuccess = (event: Event) => {

				const cursor: IDBCursorWithValue = request.result as IDBCursorWithValue;
				if (cursor) {

					size += cursor.value.length;
					cursor.continue();

				}
				return resolve(size);

			};
			request.onerror = () => reject(request.error);

		});

	}

	readValue<T>(storeName: TStore, key: string): Promise<T> {

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

	setValue<T>(storeName: TStore, key: string, value: T): Promise<void> {

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

	async update<T extends IDBase>(storeName: TStore, id: UUID, data: Partial<T>): Promise<T> {

		// lookup store
		const store = this.getStore(storeName);

		// read entity
		const entity: T = await this.read(storeName, id);

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

	delete(storeName: TStore, id: UUID): Promise<void> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			const request = store.delete(id);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);

		});

	}

	empty(storeName: TStore): Promise<void> {

		// lookup store
		const store = this.getStore(storeName);

		// return promise
		return new Promise((resolve, reject) => {

			const request = store.clear();
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);

		});

	}

	count(storeName: TStore): Promise<number> {

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

export class IndexedDb {

	errors = signal<string[]>([]);

	private configuration = signal(inject(DATABASE_CONFIG));
	private version = computed(() => Math.max(...Object.keys(this.configuration().upgrades).map(key => parseInt(key))));
	private db: IDBDatabase | null = null;

	constructor() {
		this.initDb();
	}

	private async initDb(): Promise<void> {

		return new Promise((resolve, reject) => {

			if (this.db) {
				resolve();
				return;
			}

			const request = indexedDB.open(this.configuration().dbName, this.version());
			request.onerror = (event) => {

				const msg = `IndexedDB: Error opening database`;
				console.error(msg, event);
				this.errors.update(e => [ ...e, msg ]);
				reject('Error opening database');

			};
			request.onblocked = (event) => {

				const msg = `IndexedDB blocked event`;
				this.errors.update(e => [ ...e, msg ]);
				console.warn(msg, event);
				// This can occur if there are other open connections to the database

			};
			request.onupgradeneeded = (event: IDBVersionChangeEvent) => handleUpgrade(event, this.configuration(), this.errors);
			request.onsuccess = (event) => {

				this.db = (event.target as IDBOpenDBRequest).result;
				this.db.onversionchange = () => {

					const msg = `Other connection is trying to upgrade the database, closing this connection`;
					this.errors.update(e => [ ...e, msg ]);
					console.error(msg);
					this.db!.close();
					this.db = null;

				};
				resolve();

			};

		});

	}

	async closeConnection(): Promise<void> {

		if (this.db) {

			console.log(`Closing database connection`);
			this.db.close();
			this.db = null;

		}

	}

	create<T extends IDBase>(storeName: TStore, entity: T): Promise<void> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.put(storeName, entity)

		);

	}

	read<T extends IDBase>(storeName: TStore, id: UUID): Promise<T> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.read(storeName, id)

		);

	}

	readValue<T>(storeName: TStore, key: string): Promise<T> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.readValue(storeName, key)

		);

	}

	setValue<T>(storeName: TStore, key: string, value: T): Promise<void> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.setValue(storeName, key, value)

		);

	}

	readAll<T extends IDBase>(storeName: TStore): Promise<T[]> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.readAll(storeName)

		);

	}

	readAllKeys(storeName: TStore): Promise<UUID[]> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.readAllKeys(storeName)

		);

	}

	dump(storeName: TStore): Promise<Record<string, any>> {

		return this.transaction(

			'readonly',
			[ storeName ],
			tx => tx.dump(storeName)

		);

	}

	async modify<T extends IDBase>(storeName: TStore, id: UUID, data: Partial<T>): Promise<T> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.update(storeName, id, data)

		);

	}

	delete(storeName: TStore, id: UUID): Promise<void> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.delete(storeName, id)

		);

	}

	empty(storeName: TStore): Promise<void> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.empty(storeName)

		);

	}

	count(storeName: TStore): Promise<number> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.count(storeName)

		);

	}

	size(storeName: TStore): Promise<number> {

		return this.transaction(

			'readwrite',
			[ storeName ],
			tx => tx.size(storeName)

		);

	}

	async transaction<T>(

		mode: IDBTransactionMode,
		stores: TStore[],
		operations: (transactionManager: TransactionManager) => Promise<T>

	): Promise<T> {

		await this.initDb();
		const db = this.db;
		if (!db)
			throw new Error('Database not initialized');

		const tx = db.transaction(stores, mode);
		const txManager = new TransactionManager(tx);
		return operations(txManager);

	}

}
