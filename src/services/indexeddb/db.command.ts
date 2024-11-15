import { DbStore } from '@constants/database.constant';

export interface Command {
	execute(vce: IDBVersionChangeEvent): void;
}

class CreateStoreCommand implements Command {

	constructor(
		private storeName: DbStore,
		private options: IDBObjectStoreParameters
	) { }

	execute(vce: IDBVersionChangeEvent): void {

		const request = vce.target as IDBOpenDBRequest;
		const db = request.result;

		db.createObjectStore(this.storeName, this.options);
		console.info(`Object store '${this.storeName}' created.`);

	}

}

class AddIndexCommand implements Command {

	constructor(
		private storeName: DbStore,
		private indexName: string,
		private keyPath: string | string[],
		private options: IDBIndexParameters
	) { }

	execute(vce: IDBVersionChangeEvent): void {

		const request = vce.target as IDBOpenDBRequest;
		const ts = request.transaction as IDBTransaction;
		const store = ts.objectStore(this.storeName);

		try {

			store.createIndex(this.indexName, this.keyPath, this.options);
			console.info(`Index '${this.storeName}'>'${this.indexName}' created.`);

		} catch (error) {

			if (error instanceof DOMException) {

				const customError = new Error(`[${this.storeName}:${this.indexName}]: ${error.message}`);
				customError.stack = error.stack; // Preserve the original stack trace
				throw customError;

			} else
				throw error;

		}

	}

}

class RemoveIndexCommand implements Command {

	constructor(
		private storeName: DbStore,
		private indexName: string
	) { }

	execute(vce: IDBVersionChangeEvent): void {

		const request = vce.target as IDBOpenDBRequest;
		const ts = request.transaction as IDBTransaction;
		const store = ts.objectStore(this.storeName);

		try {

			store.deleteIndex(this.indexName);
			console.info(`Index '${this.storeName}'>'${this.indexName}' removed.`);

		} catch (error) {

			if (error instanceof DOMException) {

				const customError = new Error(`[${this.storeName}:${this.indexName}]: ${error.message}`);
				customError.stack = error.stack; // Preserve the original stack trace
				throw customError;

			} else
				throw error;

		}

	}

}

class UpdatePropertyCommand implements Command {

	constructor(private storeName: DbStore, private updateFunction: (item: any) => any) { }

	execute(vce: IDBVersionChangeEvent): void {

		const request = vce.target as IDBOpenDBRequest;
		const db = request.result;
		const transaction = db.transaction(this.storeName, 'readwrite');
		const store = transaction.objectStore(this.storeName);
		const cursorRequest = store.openCursor();

		cursorRequest.onsuccess = (event: Event): void => {

			const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
			if (cursor) {

				const updatedItem = this.updateFunction(cursor.value);
				cursor.update(updatedItem);
				cursor.continue();

			}

		};

	}

}

export const dbCommands = {

	CreateStoreCommand,
	AddIndexCommand,
	RemoveIndexCommand,
	UpdatePropertyCommand

};
