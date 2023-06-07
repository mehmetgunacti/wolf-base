import { Collection, IndexableType, Table } from 'dexie';
import { WolfBaseDB } from '../wolfbase.database';
import { EntityBase } from 'lib/models/entity-base.model';
import { EntityTable } from '../../local-storage-table.interface';
import { WolfBaseTableName } from 'lib/constants/database.constant';
import { UUID } from 'lib/constants/common.constant';

export abstract class EntityTableImpl<T extends EntityBase> implements EntityTable<T> {

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

	create(item: Partial<T>): Promise<T>;
	create(items: Partial<T>[]): Promise<void>;
	async create(items: Partial<T> | Partial<T>[]): Promise<T | void> {

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

	async update(id: string, item: Partial<T>): Promise<T> {

		const localData: T | undefined = await this.get(id);
		if (!localData)
			throw new Error(`No data with id ${id} found.`);

		await this.db.table<T>(this.tablename).where('id').equals(id).modify({ ...item });

		return await this.get(id) ?? {} as T;

	}

	delete(id: string): Promise<void> {

		throw new Error('Method not implemented.');

	}

	async list(params?: { orderBy?: string | undefined; reverse?: boolean | undefined; limit?: number | undefined; } | undefined): Promise<T[]> {

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

			return await collection.toArray();

		}
		return await table.toArray();

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

	listIds(): Promise<string[]> {

		throw new Error('Method not implemented.');

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
