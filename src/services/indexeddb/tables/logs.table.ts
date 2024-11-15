import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { LogCategory } from '@constants/log.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { LogMessage } from '@models/log.model';
import { LogsLocalRepository } from '@repositories/local/log.repository';

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
