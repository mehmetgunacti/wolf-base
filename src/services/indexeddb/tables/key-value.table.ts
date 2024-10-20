import { IndexedDb } from '@libServices';
import { LocalRepositoryNames } from 'lib/constants/database.constant';
import { KeyValueRepository } from 'lib/repositories/local';

export class KeyValueLocalRepositoryImpl implements KeyValueRepository {

	constructor(
		protected db: IndexedDb,
		protected tablename: LocalRepositoryNames
	) { }

	async set<T>(key: string, value: T): Promise<void> {

		await this.db.setValue(this.tablename, key, value);

	}

	async get<T>(key: string): Promise<T | null> {

		return await this.db.readValue(this.tablename, key);

	}

	async toggle(key: string): Promise<void> {

		await this.db.transaction('readwrite', [ this.tablename ], async tx => {

			const value: boolean = await tx.readValue<boolean>(this.tablename, key);
			await tx.setValue<boolean>(this.tablename, key, !value);

		});

	}

	async remove(key: string): Promise<void> {

		await this.db.delete(this.tablename, key);

	}

	async dump(): Promise<Record<string, any>> {

		return this.db.dump(this.tablename);

	}

}
