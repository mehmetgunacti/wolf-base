import { LogCategory, LogMessage, LogsTable } from 'lib';
import { WolfBaseDB } from '../wolfbase.database';
import { Collection, IndexableType, Table } from 'dexie';

export class DexieLogsTableImpl implements LogsTable {

	constructor(private db: WolfBaseDB) { }

	async add(message: LogMessage): Promise<void> {

		await this.db.logs.add(message);

	}

	async list(params?: { category: LogCategory | null; }): Promise<LogMessage[]> {

		if (params?.category)
			return await this.db.logs.where('category').equals(params.category).toArray();

		return await this.db.logs.toArray();

	}

	async clear(): Promise<void> {

		await this.db.logs.clear();

	}

}