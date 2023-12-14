import { LogCategory, LogMessage, UUID } from '@lib';
import { WolfBaseDB } from '../wolfbase.database';
import { LogsLocalRepository } from 'lib/repositories/local';

export class DexieLogsLocalRepositoryImpl implements LogsLocalRepository {

	constructor(private db: WolfBaseDB) { }

	async add(message: LogMessage): Promise<void> {

		await this.db.logs.add(message);

	}

	async list(params?: { category?: LogCategory; entityId?: UUID, limit?: number }): Promise<LogMessage[]> {

		const limit = params?.limit || 100;
		const { entityId, category } = params ?? {};

		if (entityId && category)
			return await this.db.logs.where('entityId').equals(entityId).and(log => log.category === category).reverse().sortBy(':id');

		if (category)
			return await this.db.logs.where('category').equals(category).limit(limit).reverse().sortBy(':id');

		if (entityId)
			return await this.db.logs.where('entityId').equals(entityId).reverse().sortBy(':id');

		return await this.db.logs.limit(limit).reverse().sortBy(':id');

	}

	async clear(): Promise<void> {

		await this.db.logs.clear();

	}

}
