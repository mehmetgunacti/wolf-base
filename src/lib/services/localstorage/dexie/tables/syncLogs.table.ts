import { ISODateString, SyncLog, SyncMessage, SyncMessageType } from 'lib/models';
import { SyncLogsTable } from 'lib/services/localstorage/local-storage-table.interface';
import { KeyValueTableImpl } from './key-value.table';
import { RemoteCollection, WolfBaseTableName } from 'lib/constants';

export class SyncLogsTableImpl extends KeyValueTableImpl implements SyncLogsTable {

	async create(): Promise<SyncLog> {

		const syncLog: SyncLog = {

			id: new Date().toISOString(),
			inProgress: true

		}
		await this.set(syncLog.id, syncLog);
		return syncLog;

	}

	async finish(id: string, result: string): Promise<void> {

		await this.db.sync_logs
			.where({ id })
			.modify((syncLog: SyncLog): void => {

				syncLog.inProgress = false;
				syncLog.result = result;
				syncLog.end = new Date().toISOString();

			});

	}

	async list(): Promise<SyncLog[]> {

		return await this.db.table<SyncLog>(this.tablename).orderBy('id').reverse().toArray();

	}

	async title(id: string, collection: RemoteCollection, message: string): Promise<void> {

		await this.log(id, collection, message, 'title');

	}

	async subtitle(id: string, collection: RemoteCollection, message: string): Promise<void> {

		await this.log(id, collection, message, 'subtitle');

	}

	async log(syncLogId: string, collection: RemoteCollection, message: string, type: SyncMessageType = 'normal'): Promise<void> {

		console.info(syncLogId, collection, message);
		await this.db.sync_messages.add({ syncLogId, collection, message, type });

	}

	async messages(syncLogId: ISODateString): Promise<SyncMessage[]> {

		return await this.db.sync_messages.where('syncLogId').equals(syncLogId).toArray();

	}

	async clear(): Promise<void> {

		await this.db.transaction('rw', [WolfBaseTableName.sync_logs, WolfBaseTableName.sync_messages], async () => {

			await this.db.table(WolfBaseTableName.sync_logs).clear();
			await this.db.table(WolfBaseTableName.sync_messages).clear();

		});

	}

}

export class MockSyncLogsTableImpl implements SyncLogsTable {

	private static IDS: number = 0;

	private syncLogs: Map<string, SyncLog> = new Map();
	private syncMessages: SyncMessage[] = [];

	async create(): Promise<SyncLog> {

		const syncLog: SyncLog = {

			id: new Date().toISOString(),
			inProgress: true

		}
		this.syncLogs.set(syncLog.id, syncLog);
		return syncLog;

	}

	async finish(id: string, result: string): Promise<void> {

		const syncLog = this.syncLogs.get(id);
		if (!syncLog)
			throw new Error(`syncLog with id ${id} not found. Call SyncLogTable.create() first.`);

		syncLog.inProgress = false;
		syncLog.result = result;
		syncLog.end = new Date().toISOString();

	}

	async list(): Promise<SyncLog[]> {

		return Array.from(this.syncLogs.values());

	}

	async title(id: string, collection: RemoteCollection, message: string): Promise<void> {

		await this.log(id, collection, message, 'title');

	}

	async subtitle(id: string, collection: RemoteCollection, message: string): Promise<void> {

		await this.log(id, collection, message, 'subtitle');

	}

	async log(syncLogId: string, collection: RemoteCollection, message: string, type: SyncMessageType = 'normal'): Promise<void> {

		const syncLog = this.syncMessages.push({ id: ++MockSyncLogsTableImpl.IDS, syncLogId, collection, message, type });

	}

	async messages(syncLogId: ISODateString): Promise<SyncMessage[]> {

		return this.syncMessages.filter(m => m.syncLogId === syncLogId);

	}

	async clear(): Promise<void> {

		this.syncLogs.clear();
		this.syncMessages = [];

	}

}