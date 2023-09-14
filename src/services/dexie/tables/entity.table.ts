import { Collection, IndexableType, Table } from 'dexie';
import { EntityTable, LogCategory } from 'lib';
import { UUID } from 'lib/constants/common.constant';
import { WolfBaseTableName } from 'lib/constants/database.constant';
import { RemoteData, RemoteMetadata, SyncData } from 'lib/models';
import { Entity, Metadata } from 'lib/models/entity.model';
import { WolfBaseDB } from '../wolfbase.database';

export abstract class EntityTableImpl<T extends Entity> implements EntityTable<T> {

	constructor(
		protected db: WolfBaseDB,
		protected tablename: WolfBaseTableName
	) { }

	async getEntity(id: UUID): Promise<T | null> {

		const item = await this.db.table<T>(this.tablename).get(id);
		return item ?? null;

	}

	async getSyncData(id: UUID): Promise<SyncData | null> {

		return await this.db.table<SyncData>(this.tablename + '_sync').get(id) ?? null;

	}

	async storeRemoteData(items: RemoteData<T>[]): Promise<number> {

		await this.db.transaction('rw', [
			this.tablename,
			this.tablename + '_sync',
			this.tablename + '_trash',
			this.tablename + '_remote',
			WolfBaseTableName.logs
		], async () => {

			for (const item of items)
				await this._put(item);

		});
		return items.length;

	}

	async storeMetadata(data: Metadata): Promise<void> {

		await this.db.transaction('rw', [this.tablename + '_sync', this.tablename + '_remote'], async () => {

			await this.db.table(this.tablename + '_sync').put(data, data.id);
			await this.db.table(this.tablename + '_remote').put(data, data.id);

		});

	}

	async storeRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		await this.db.transaction('rw', [this.tablename + '_remote'], async () => {

			await this.db.table(this.tablename + '_remote').clear();
			await this.db.table(this.tablename + '_remote').bulkPut(data);

		});

	}

	async create(item: Partial<T>): Promise<T> {

		const newItem: T = this.newItemFromPartial(item);
		await this.db.table<T>(this.tablename).add(newItem);
		return newItem;

	}

	async update(id: UUID, item: Partial<T>): Promise<number> {

		let count = 0;
		await this.db.transaction('rw', [
			this.tablename,
			this.tablename + '_sync'
		], async () => {

			count = await this.db.table<T>(this.tablename).where('id').equals(id).modify({ ...item });
			if (count > 0)
				await this.db.table<SyncData>(this.tablename + '_sync').where('id').equals(id).modify({ updated: true } as Partial<SyncData>);

		});
		return count;

	}

	async list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; } | undefined): Promise<T[]> {

		const table: Table<T, IndexableType> = this.db.table<T>(this.tablename);
		let collection: Collection<T, IndexableType>;

		if (params) {

			if (params.orderBy)
				collection = table.orderBy(params.orderBy);
			else
				collection = table.toCollection();

			if (params.reverse)
				collection = collection.reverse();

			if (params.limit)
				collection = collection.limit(params.limit);

			if (params.filterFn)
				collection = collection.filter(params.filterFn);

			return await collection.toArray();

		}
		return await table.toArray();

	}

	async listSyncData(): Promise<SyncData[]> {

		return await this.db.table<SyncData>(this.tablename + '_sync').toArray();

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return await this.db.table<RemoteMetadata>(this.tablename + '_remote').toArray();

	}

	async moveToTrash(id: UUID): Promise<void> {

		await this.db.transaction('rw', [
			this.tablename,
			this.tablename + '_sync',
			this.tablename + '_trash'
		], async () => {

			const item = await this.db.table<T>(this.tablename).get(id);
			if (item) {

				await this.db.table<T>(this.tablename + '_trash').add(item);
				await this.db.table<T>(this.tablename + '_sync').where({ id }).modify({ deleted: true } as SyncData);
				await this.db.table(this.tablename).delete(id);

			}

		});

	}

	async listDeletedItems(): Promise<T[]> {

		return await this.db.table<T>(this.tablename + '_trash').toArray();

	}

	private async _put(remoteData: RemoteData<T>): Promise<void> {

		const { id, createTime, updateTime } = remoteData.metaData;

		// move local entity to trash
		const entity = await this.db.table<T>(this.tablename).get(id);
		if (entity)
			await this.db.table(this.tablename + '_trash').add(entity);

		// store incoming entity
		await this.db.table<T>(this.tablename).put(remoteData.entity);

		// add/update 'remote'
		await this.db.table<RemoteMetadata>(this.tablename + '_remote').put(remoteData.metaData, id);

		// add to sync table
		await this.db.table<SyncData>(this.tablename + '_sync').put({

			id,
			createTime,
			updateTime,
			updated: false,
			deleted: false,
			error: null

		});

		// add log
		await this.db.logs.add({
			category: LogCategory.remote_data_stored,
			date: new Date().toISOString(),
			message: `"${remoteData.entity.name}" stored`,
			entityId: id
		});

	}

	async delete(id: string): Promise<number> {

		await this.bulkDelete([id]);
		return 1;

	}

	async bulkDelete(ids: UUID[]): Promise<number> {

		await this.db.transaction('rw', [
			this.tablename,
			this.tablename + '_sync',
			this.tablename + '_trash',
			this.tablename + '_remote',
			WolfBaseTableName.logs
		], async () => {

			let logMessage = 'metadata deleted';

			for (const id of ids) {

				const item = await this.db.table<T>(this.tablename).get(id);
				if (item) {

					logMessage = `"${item.name}" deleted`;
					await this.db.table(this.tablename + '_trash').add(item);
					await this.db.table(this.tablename).delete(id);

				}

				await this.db.table(this.tablename + '_sync').delete(id);
				await this.db.table(this.tablename + '_remote').delete(id);

				// add log
				await this.db.logs.add({
					category: LogCategory.entity_deleted,
					date: new Date().toISOString(),
					message: logMessage,
					entityId: id
				});


			}

		});
		return ids.length;

	}

	async listIds(): Promise<UUID[]> {

		return await this.db.table<T>(this.tablename).toCollection().primaryKeys() as UUID[];

	}

	protected abstract newItemFromPartial(item: Partial<T>): T;
	protected abstract newInstance(id: UUID, item: Partial<T>): T;

}
