import { LocalRepositoryNames } from '@constants';
import { KeyValueRepository } from '@repositories';
import { WolfBaseDB } from '../wolfbase.database';

export class KeyValueLocalRepositoryImpl implements KeyValueRepository {

	constructor(
		protected db: WolfBaseDB,
		protected tablename: LocalRepositoryNames
	) { }

	async set<T>(key: string, value: T): Promise<void> {

		await this.db.table<T>(this.tablename).put(value, key);

	}

	async get<T>(key: string): Promise<T | null> {

		return await this.db.table<T>(this.tablename).get(key) ?? null;

	}

	async toggle(key: string): Promise<void> {

		await this.db.table(this.tablename).where(':id').equals(key).modify((v, c) => { c.value = !v; });

	}

	async remove(key: string): Promise<void> {

		return await this.db.table<string>(this.tablename).delete(key);

	}

	async dump(): Promise<Map<string, any>> {

		// return value
		const result: Map<string, any> = new Map();

		// iterate all keys
		const table = this.db.table(this.tablename);
		const data = table.toCollection();
		await data.each(
			(obj: any, cursor) => result.set(cursor.key.toString(), obj)
		);
		return result;

	}

}
