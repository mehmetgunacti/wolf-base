import { LocalRepositoryNames } from '@constants/database.constant';
import { IndexedDb } from '@libServices/indexeddb.service';
import { KeyValueRepository } from '@repositories/local/key-value.repository';

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

			const value: boolean | null = await tx.readValue<boolean>(this.tablename, key);
			if (value)
				await tx.setValue<boolean>(this.tablename, key, !value);

		});

	}

	async remove(key: string): Promise<void> {

		await this.db.delete(this.tablename, key);

	}

	dump(): Promise<Record<string, any>> {

		return this.db.dump(this.tablename);

	}

}
