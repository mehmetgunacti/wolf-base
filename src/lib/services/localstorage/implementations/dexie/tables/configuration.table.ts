import { WolfBaseTableName } from 'lib/constants';
import { ConfigurationTableInterface } from 'lib/services/localstorage/local-storage-table.interface';
import { WolfBaseDB } from '../wolfbase.database';

export class ConfigurationTable implements ConfigurationTableInterface {

	tablename = WolfBaseTableName.configuration;

	constructor(protected db: WolfBaseDB) { }


	async clear(): Promise<void> {

		await this.db.table(this.tablename).clear();

	}

	async set<T>(key: string, value: T): Promise<void> {

		await this.db.table<T>(this.tablename).put(value, key);

	}

	async get<T>(key: string): Promise<T> {

		return await this.db.table<T>(this.tablename).get(key) as T;

	}

	async remove(key: string): Promise<void> {

		return await this.db.table<string>(this.tablename).delete(key);

	}

}
