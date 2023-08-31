import { LogMessage, LogsTable } from 'lib';
import { WolfBaseDB } from '../wolfbase.database';

export class LogsTableImpl implements LogsTable {

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

export class MockLogsTableImpl implements LogsTable {

	private map: Record<number, LogMessage> = {};

	async add(message: LogMessage): Promise<void> {

		const newId: number = Object.keys(this.map).length + 1;
		this.map[newId] = message;

	}

	async list(): Promise<LogMessage[]> {

		return Object.values(this.map);

	}

	async clear(): Promise<void> {

		this.map = {};

	}

}