import { RemoteCollection, UUID } from 'lib/constants';
import { SyncData } from 'lib/models';
import { SyncDataTable } from 'lib/services/localstorage/local-storage-table.interface';
import { WolfBaseDB } from '../wolfbase.database';

export class SyncDataTableImpl implements SyncDataTable {

	constructor(protected db: WolfBaseDB) { }

	async get<T>(id: UUID): Promise<SyncData | undefined> {

		return await this.db.syncData.get(id) as SyncData;

	}

	async put<T>(item: SyncData): Promise<void> {

		await this.db.syncData.put(item);

	}

	async delete(id: UUID): Promise<void> {

		await this.db.syncData.delete(id);

	}

	async list(collection?: RemoteCollection): Promise<SyncData[]> {

		if (collection)
			return await this.db.syncData.toCollection().filter(s => s.collection === collection).toArray();

		return await this.db.syncData.toArray();

	}

	async listIds(collection?: RemoteCollection): Promise<UUID[]> {

		if (collection)
			return (await this.db.syncData.toCollection().filter(s => s.collection === collection).toArray()).map(s => s.id);

		return (await this.db.syncData.toArray()).map(s => s.id);

	}

}