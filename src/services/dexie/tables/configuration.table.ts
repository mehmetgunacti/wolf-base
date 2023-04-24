import { WolfBaseTableName } from 'lib/constants';
import { ConfigurationTable } from 'lib/services/localstorage/local-storage-table.interface';
import { WolfBaseDB } from '../wolfbase.database';
import { BasicTableImpl } from '../dexie.table';

export class ConfigurationTableImpl extends BasicTableImpl<string> implements ConfigurationTable {

	tablename = WolfBaseTableName.configuration;

	constructor(db: WolfBaseDB) {
		super(db, WolfBaseTableName.configuration);
	}

	list(): Promise<{ key: string; value: string; }[]> {
		throw new Error('Method not implemented.');
	}

	toArray(): Promise<any[]> {
		throw new Error('Method not implemented.');
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
