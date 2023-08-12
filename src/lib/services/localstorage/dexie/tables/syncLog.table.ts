import { SyncLog, SyncMessage } from 'lib/models';
import { SyncLogTable } from 'lib/services/localstorage/local-storage-table.interface';
import { KeyValueTableImpl } from './key-value.table';

export class SyncLogTableImpl extends KeyValueTableImpl implements SyncLogTable {

	async create(): Promise<SyncLog> {

		const syncLog: SyncLog = {

			id: new Date().toISOString(),
			messages: [],
			inProgress: false

		}
		await this.set(syncLog.id, syncLog);
		return syncLog;

	}

	async finish(id: string): Promise<void> {

		await this.db.sync_log
			.where({ id })
			.modify((syncLog: SyncLog): void => {

				syncLog.inProgress = false;

			});

	}

	async log(id: string, message: SyncMessage): Promise<void> {

		await this.db.sync_log
			.where({ id })
			.modify((syncLog: SyncLog): void => {

				syncLog.messages = [
					...syncLog.messages,
					message
				];

			});

	}

}

export class MockSyncLogTableImpl implements SyncLogTable {

	private map: Map<string, SyncLog> = new Map();

	async create(): Promise<SyncLog> {

		const syncLog: SyncLog = {

			id: new Date().toISOString(),
			messages: [],
			inProgress: false

		}
		this.map.set(syncLog.id, syncLog);
		return syncLog;

	}

	async finish(id: string): Promise<void> {

		const syncLog = this.map.get(id);
		if (syncLog)
			syncLog.inProgress = false;

	}

	async log(id: string, message: SyncMessage): Promise<void> {

		const syncLog = this.map.get(id);
		if (syncLog)
			syncLog.messages = [
				...syncLog.messages,
				message
			];

	}

}