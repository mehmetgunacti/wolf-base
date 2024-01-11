import { LogCategory, LogMessage, UUID } from '@lib';
import { WolfBaseDB } from '../wolfbase.database';
import { LogsLocalRepository } from 'lib/repositories/local';

export class DexieLogsLocalRepositoryImpl implements LogsLocalRepository {

	constructor(private db: WolfBaseDB) { }

	async add(message: LogMessage): Promise<void> {

		await this.db.logs.add(message);

	}

	async list(params: { categories?: LogCategory[]; entityId?: UUID | null, limit: number }): Promise<LogMessage[]> {

		const { entityId, categories, limit } = params;

		// todo:
		// if (entityId && category)
		//	return await this.db.logs.where('entityId').equals(entityId).and(log => log.category === category).reverse().sortBy(':id');

		if (entityId)
			return await this.db.logs.where('entityId').equals(entityId).reverse().sortBy(':id');

		// todo: only first category is used
		if (categories && categories.length > 0)
			return await this.db.logs.where('category').equals(categories[0]).limit(limit).reverse().sortBy(':id');

		return await this.db.logs.limit(limit).reverse().sortBy(':id');

	}

	async clear(): Promise<void> {

		await this.db.logs.clear();

	}

}
