import { Collection, IndexableType, Table } from 'dexie';
import { UUID } from 'lib/constants/common.constant';
import { WolfBaseTableName } from 'lib/constants/database.constant';
import { Entity, PartialEntity } from 'lib/models/entity.model';
import { EntityTable } from '../../local-storage-table.interface';
import { WolfBaseDB } from '../wolfbase.database';
import { isNewer } from 'lib/utils';

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

	create(item: PartialEntity<T>): Promise<T>;
	create(items: PartialEntity<T>[]): Promise<void>;
	async create(items: PartialEntity<T> | PartialEntity<T>[]): Promise<T | void> {

		if (Array.isArray(items)) {

			await this.db.table<T>(this.tablename).bulkPut(
				items.map(data => this.newItemFromPartial(data))
			);
			return;

		} else {

			const newItem: T = this.newItemFromPartial(items);
			await this.db.table<T>(this.tablename).add(newItem);
			return newItem;

		}

	}

	async update(id: string, item: PartialEntity<T>): Promise<T> {

		const localData: T | undefined = await this.get(id);
		if (!localData)
			throw new Error(`No data with id ${id} found.`);

		await this.db.table<T>(this.tablename).where('id').equals(id).modify({ ...item, _updated: true });
		return await this.get(id) ?? {} as T;

	}

	async put(item: T): Promise<void> {

		await this.db.table<T>(this.tablename).put(item);

	}

	async markConflict(id: string): Promise<void> {

		await this.db.table<T>(this.tablename).where({ id }).modify({ _conflict: true } as Partial<Entity>);

	}

	async markDeleted(id: string): Promise<void> {

		await this.db.table<T>(this.tablename).where({ id }).modify({ _deleted: true } as Partial<Entity>);

	}

	async delete(id: string): Promise<void> {

		await this.db.table<T>(this.tablename).delete(id);

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

	async listNew(): Promise<T[]> {

		return await this.list({ filterFn: e => !e.createTime });

	}

	async listConflicts(): Promise<T[]> {

		return await this.list({ filterFn: e => !!e._conflict });

	}

	async listUpdated(): Promise<T[]> {

		return await this.list({ filterFn: e => !!e._updated });

	}

	async listDeleted(): Promise<T[]> {

		return await this.list({ filterFn: e => !!e._deleted });

	}

	async removeExistingFrom(remoteEntities: Entity[]): Promise<Entity[]> {

		const localIds: Set<UUID> = new Set(await this.listIds());

		// find remote-new item IDs
		return remoteEntities.filter(e => !localIds.has(e.id));

	}


	async removeSynchronousFrom(remoteEntities: Entity[]): Promise<Entity[]> {

		// find remote entities with a newer 'updateTime'
		const localEntities = await this.listEntities();
		const mapLocalEntites = new Map(localEntities.map(e => [e.id, e]));

		return remoteEntities.filter(r => {

			const localEntity = mapLocalEntites.get(r.id);
			return r.updateTime && localEntity?.updateTime && isNewer(r.updateTime, localEntity.updateTime)

		});

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

	async listEntities(): Promise<Entity[]> {

		const allEntities = await this.list();
		return allEntities.map(e => {

			const { id, updateTime, createTime, name, _updated, _deleted, _conflict } = e;
			const entity = {
				id,
				name,
				createTime,
				updateTime,
				_conflict,
				_deleted,
				_updated
			} as Entity;
			return entity;

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

	protected abstract newItemFromPartial(item: PartialEntity<T>): T;

	protected abstract newInstance(id: UUID, item: PartialEntity<T>): T;

}
