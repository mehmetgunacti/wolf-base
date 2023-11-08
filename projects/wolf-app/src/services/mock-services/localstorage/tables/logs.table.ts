import { LogMessage } from '@lib';
import { LogsLocalRepository } from 'lib/repositories/local';

export class MockLogsLocalRepositoryImpl implements LogsLocalRepository {

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
