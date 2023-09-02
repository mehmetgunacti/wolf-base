import { Collection, IndexableType, Table } from 'dexie';
import { EntityTable } from 'lib';
import { UUID } from 'lib/constants/common.constant';
import { WolfBaseTableName } from 'lib/constants/database.constant';
import { RemoteData, RemoteMetadata, SyncData } from 'lib/models';
import { Entity } from 'lib/models/entity.model';
import { WolfBaseDB } from '../wolfbase.database';

export abstract class EntityTableImpl<T extends Entity> implements EntityTable<T> {

	constructor(
		protected db: WolfBaseDB,
		protected tablename: WolfBaseTableName
	) { }

	async toArray(): Promise<any[]> {

		return await this.db.table(this.tablename).toArray();

	}

	async get(id: UUID): Promise<T | null> {

		const item = await this.db.table<T>(this.tablename).get(id);
		return item ?? null;

	}

	async create(item: Partial<T>): Promise<T> {

		const newItem: T = this.newItemFromPartial(item);
		await this.db.table<T>(this.tablename).add(newItem);
		return newItem;

	}

	async update(id: string, item: Partial<T>): Promise<number> {

		let count = 0;
		await this.db.transaction('rw', [this.tablename, this.tablename + '_sync'], async () => {

			count = await this.db.table<T>(this.tablename).where('id').equals(id).modify({ ...item });
			if (count > 0)
				await this.db.table<SyncData>(this.tablename + '_sync').where('id').equals(id).modify({ updated: true } as Partial<SyncData>);

		});
		return count;

	}

	async put(item: RemoteData<T>): Promise<void> {

		await this.db.transaction('rw', [this.tablename, this.tablename + '_sync'], async () => {

			// add to data table
			await this.db.table<T>(this.tablename).put(item.entity);

			// add to sync table
			const { id, createTime, updateTime } = item.metaData;
			await this.db.table<SyncData>(this.tablename + '_sync').put({

				id,
				createTime,
				updateTime,
				updated: false,
				deleted: false,
				error: null

			});

		});

	}

	async putAll(items: RemoteData<T>[]): Promise<void> {

		await this.db.transaction('rw', [this.tablename, this.tablename + '_sync'], async () => {

			// add to data table
			await this.db.table<T>(this.tablename).bulkPut(items.map(item => item.entity));

			// add to sync table
			await this.db.table<SyncData>(this.tablename + '_sync').bulkPut(items.map(

				item => {

					const { id, createTime, updateTime } = item.metaData;
					return {

						id,
						createTime,
						updateTime,
						updated: false,
						deleted: false,
						error: null

					}

				}

			));

		});

	}

	async markError(id: UUID, error: string): Promise<void> {

		await this.db.table<T>(this.tablename + '_sync').where({ id }).modify({ error } as Partial<Entity>);

	}

	async moveToTrash(id: UUID): Promise<void> {

		await this.db.transaction('rw', [this.tablename, this.tablename + '_sync', this.tablename + '_trash'], async () => {

			const item = await this.db.table<T>(this.tablename).get(id);
			if (item) {

				await this.db.table<T>(this.tablename + '_trash').put(item);
				await this.db.table<T>(this.tablename + '_sync').where({ id }).modify({ deleted: true } as SyncData);
				await this.db.table(this.tablename).delete(id);

			}

		});

	}

	async deletePermanently(id: string): Promise<void> {

		await this.db.transaction('rw', [this.tablename, this.tablename + '_sync', this.tablename + '_trash'], async () => {

			await this.db.table(this.tablename).delete(id);
			await this.db.table(this.tablename + '_sync').delete(id);
			await this.db.table(this.tablename + '_trash').delete(id);

		});

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

	async listNewIds(): Promise<UUID[]> {

		const syncData = await this.db.table<SyncData>(this.tablename + '_sync').toArray();
		const setSyncIds = new Set(syncData.map(s => s.id));

		const ids = await this.listIds();
		return ids.filter(id => !setSyncIds.has(id));

	}

	async listErrors(): Promise<SyncData[]> {

		return await this.db.table<SyncData>(this.tablename + '_sync').filter(s => !!s.error).toArray();

	}

	async listUpdated(): Promise<SyncData[]> {

		return await this.db.table<SyncData>(this.tablename + '_sync').filter(s => s.updated).toArray();

	}

	async listDeletedItems(): Promise<T[]> {

		return await this.db.table<T>(this.tablename + '_trash').toArray();

	}

	async getSyncData(id: UUID): Promise<SyncData | null> {

		return await this.db.table<SyncData>(this.tablename + '_sync').get(id) ?? null;

	}

	async getTrashItem(id: UUID): Promise<T | null> {

		return await this.db.table<T>(this.tablename + '_trash').get(id) ?? null;

	}

	async listSyncData(): Promise<SyncData[]> {

		return await this.db.table<SyncData>(this.tablename + '_sync').toArray();

	}

	async getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null> {

		return await this.db.table<RemoteMetadata>(this.tablename + '_remote').get(id) ?? null;

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return await this.db.table<RemoteMetadata>(this.tablename + '_remote').toArray();

	}

	async putRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		await this.db.transaction('rw', [this.tablename + '_remote'], async () => {

			await this.db.table(this.tablename + '_remote').clear();
			await this.db.table(this.tablename + '_remote').bulkPut(data);

		});

	}

	async listIds(): Promise<UUID[]> {

		return await this.db.table<T>(this.tablename).toCollection().primaryKeys() as UUID[];

	}

	search(term: string): Promise<T[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<T[]> {

		throw new Error('Method not implemented.');

	}

	protected abstract newItemFromPartial(item: Partial<T>): T;
	protected abstract newInstance(id: UUID, item: Partial<T>): T;

}
