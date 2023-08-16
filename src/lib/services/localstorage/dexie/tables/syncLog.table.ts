import { RemoteCollection } from 'lib/constants';
import { SyncLog, SyncMessageType } from 'lib/models';
import { SyncLogTable } from 'lib/services/localstorage/local-storage-table.interface';
import { KeyValueTableImpl } from './key-value.table';
import { filter } from 'rxjs';

export class SyncLogTableImpl extends KeyValueTableImpl implements SyncLogTable {

	async create(): Promise<SyncLog> {

		const syncLog: SyncLog = {

			id: new Date().toISOString(),
			messages: {},
			inProgress: true

		}
		await this.set(syncLog.id, syncLog);
		return syncLog;

	}

	async finish(id: string, result: string): Promise<void> {

		await this.db.sync_log
			.where({ id })
			.modify((syncLog: SyncLog): void => {

				syncLog.inProgress = false;
				syncLog.result = result;
				syncLog.end = new Date().toISOString();

			});

	}

	async title(id: string, collection: RemoteCollection, message: string): Promise<void> {

		await this.log(id, collection, message, 'title');

	}

	async subtitle(id: string, collection: RemoteCollection, message: string): Promise<void> {

		await this.log(id, collection, message, 'subtitle');

	}

	async log(id: string, collection: RemoteCollection, message: string, type: SyncMessageType = 'normal'): Promise<void> {

		console.info(id, collection, message);
		await this.db.sync_log
			.where({ id })
			.modify((syncLog: SyncLog): void => {

				let messages = syncLog.messages[collection];
				if (!messages) {

					messages = [];
					syncLog.messages[collection] = messages;

				}
				messages.push({ message, type });

			});

	}

	async list(filterFn?: (s: SyncLog) => boolean): Promise<SyncLog[]> {

		const arr = this.db.table<SyncLog>(this.tablename).orderBy('id').reverse();
		if (filterFn)
			return await arr.filter(filterFn).toArray();
		return await arr.toArray();

	}

	async clear(): Promise<void> {

		await this.db.sync_log.clear();

	}

}

export class MockSyncLogTableImpl implements SyncLogTable {

	private map: Map<string, SyncLog> = new Map();

	async create(): Promise<SyncLog> {

		const syncLog: SyncLog = {

			id: new Date().toISOString(),
			messages: {},
			inProgress: true

		}
		this.map.set(syncLog.id, syncLog);
		return syncLog;

	}

	async finish(id: string, result: string): Promise<void> {

		const syncLog = this.map.get(id);
		if (!syncLog)
			throw new Error(`syncLog with id ${id} not found. Call SyncLogTable.create() first.`);

		syncLog.inProgress = false;
		syncLog.result = result;
		syncLog.end = new Date().toISOString();

	}

	async title(id: string, collection: RemoteCollection, message: string): Promise<void> {

		await this.log(id, collection, message, 'title');

	}

	async subtitle(id: string, collection: RemoteCollection, message: string): Promise<void> {

		await this.log(id, collection, message, 'subtitle');

	}

	async log(id: string, collection: RemoteCollection, message: string, type: SyncMessageType = 'normal'): Promise<void> {

		const syncLog = this.map.get(id);
		if (!syncLog)
			throw new Error(`syncLog with id ${id} not found. Call SyncLogTable.create() first.`);

		let messages = syncLog.messages[collection];
		if (!messages) {

			messages = [];
			syncLog.messages[collection] = messages;

		}
		messages.push({ message, type });

	}

	async list(filterFn?: (s: SyncLog) => boolean): Promise<SyncLog[]> {

		const arr = Array.from(this.map.values());
		if (filterFn)
			return arr.filter(filterFn)
		return arr;

	}

	async clear(): Promise<void> {

		this.map.clear();

	}

}