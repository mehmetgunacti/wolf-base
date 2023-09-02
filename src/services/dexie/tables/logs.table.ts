import { LogMessage, LogsTable } from 'lib';
import { WolfBaseDB } from '../wolfbase.database';

export class DexieLogsTableImpl implements LogsTable {

	constructor(private db: WolfBaseDB) { }

	async add(message: LogMessage): Promise<void> {

		await this.db.logs.add(message);

	}

	async list(): Promise<LogMessage[]> {

		return await this.db.logs.toArray();

	}

	async clear(): Promise<void> {

		await this.db.logs.clear();

	}

}