import { LogMessage, LogsTable } from '@lib';

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
