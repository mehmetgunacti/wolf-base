import { Collection, IndexableType, Table } from 'dexie';
import { UUID } from 'lib/constants/common.constant';
import { WolfBaseTableName } from 'lib/constants/database.constant';
import { RemoteData, SyncData } from 'lib/models';
import { Entity, Metadata } from 'lib/models/entity.model';
import { isNewer } from 'lib/utils';
import { EntityTable } from '../../local-storage-table.interface';
import { WolfBaseDB } from '../wolfbase.database';

export abstract class EntityTableImpl<T extends Entity> implements EntityTable<T> {

	constructor(
		protected db: WolfBaseDB,
		protected tablename: WolfBaseTableName
	) { }

	async toArray(): Promise<any[]> {

		return await this.db.table(this.tablename).toArray();

	}

	async get(id: UUID): Promise<T | undefined> {

		return await this.db.table<T>(this.tablename).get(id);

	}

	async create(item: Partial<T>): Promise<T> {

		const newItem: T = this.newItemFromPartial(item);
		await this.db.table<T>(this.tablename).add(newItem);
		return newItem;

	}

	async update(id: string, item: Partial<T>): Promise<number> {

		let count = 0;
		await this.db.transaction('rw', this.db.bookmarks, this.db.bookmarks_sync, async () => {

			count = await this.db.table<T>(this.tablename).where('id').equals(id).modify({ ...item });
			if (count > 0)
				await this.db.table<SyncData>(this.tablename + '_sync').where('id').equals(id).modify({ updated: true } as Partial<SyncData>);

		});
		return count;

	}

	async put(item: RemoteData<T>): Promise<void> {

		await this.db.transaction('rw', this.db.bookmarks, this.db.bookmarks_sync, async () => {

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

	async markError(id: UUID, error: string): Promise<void> {

		await this.db.table<T>(this.tablename + '_sync').where({ id }).modify({ error } as Partial<Entity>);

	}

	async moveToTrash(id: UUID): Promise<void> {

		await this.db.transaction('rw', this.db.bookmarks, this.db.bookmarks_sync, this.db.bookmarks_trash, async () => {

			const item = await this.db.table<T>(this.tablename).get(id);
			if (item) {

				await this.db.table<T>(this.tablename + '_trash').put(item);
				await this.db.table<T>(this.tablename + '_sync').where({ id }).modify({ deleted: true } as SyncData);
				await this.db.table(this.tablename).delete(id);

			}

		});

	}

	async deletePermanently(id: string): Promise<void> {

		await this.db.transaction('rw', [this.tablename + '_sync', this.tablename + '_trash'], async () => {

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

	async filterNew(entities: Metadata[]): Promise<Metadata[]> {

		// create a Map of all ids from ..._sync table
		const local: SyncData[] = await this.db.table<SyncData>(this.tablename + '_sync').toArray();
		const localIds: Set<UUID> = new Set(local.map(s => s.id));

		// filter
		return entities.filter(e => !localIds.has(e.id));

	}

	async filterUpdated(remoteEntities: Metadata[]): Promise<Metadata[]> {

		// find remote entities with a newer 'updateTime'
		const localMetaData = await this.listSyncData();
		if (localMetaData.length === 0)
			return [];

		const mapLocalMetaData = new Map(localMetaData.map(e => [e.id, e]));
		return remoteEntities.filter(r => {

			const localEntity = mapLocalMetaData.get(r.id);
			if (!localEntity) // if remote item not in local sync table -> skip
				return false;
			return isNewer(r.updateTime, localEntity.updateTime)

		});

	}

	async filterDeleted(entities: Metadata[]): Promise<SyncData[]> {

		// set of remote ids
		const set: Set<UUID> = new Set(entities.map(e => e.id));

		// list of local ids
		const localIds: SyncData[] = await this.listSyncData();

		// find the difference
		return localIds.filter(entity => !set.has(entity.id));

	}

	// list$(params?: { orderBy?: string | undefined; reverse?: boolean | undefined; limit?: number | undefined; } | undefined): Observable<T[]> {

	// 	return fromEventPattern(

	// 		// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
	// 		// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
	// 		// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
	// 		(handler) => liveQuery(() => this.list(params)).subscribe(handler),

	// 		// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
	// 		(handler, unsubscribe) => unsubscribe()

	// 	);

	// }

	async listSyncData(): Promise<SyncData[]> {

		return await this.db.table<SyncData>(this.tablename + '_sync').toArray();

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
