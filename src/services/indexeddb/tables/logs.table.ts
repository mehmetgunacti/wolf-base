import { DbStore, LogCategory, UUID } from '@constants';
import { IndexedDb } from '@libServices';
import { LogMessage } from '@models';
import { LogsLocalRepository } from 'lib/repositories/local';

export class LogsLocalRepositoryImpl implements LogsLocalRepository {

	constructor(private db: IndexedDb) { }

	async add(message: LogMessage): Promise<void> {

		await this.db.add(DbStore.logs, message);

	}

	async list(params: { categories?: LogCategory[]; entityId?: UUID | null, limit: number; }): Promise<LogMessage[]> {

		return await this.db.readAll<LogMessage>(DbStore.logs);

	}

	async clear(): Promise<void> {

		await this.db.empty(DbStore.logs);

	}

}
