import { WolfBaseTableName } from 'lib/constants';
import { BasicTable, KeyValueTable } from '../../lib/services/localstorage/local-storage-table.interface';
import { WolfBaseDB } from './wolfbase.database';
import { Observable, fromEventPattern } from 'rxjs';
import { liveQuery } from 'dexie';

export class BasicTableImpl<T> implements BasicTable {

	constructor(
		protected db: WolfBaseDB,
		protected tablename: WolfBaseTableName
	) { }

	async clear(): Promise<void> {

		await this.db.table(this.tablename).clear();

	}

	async dump<T>(): Promise<Record<string, T>> {

		const table = this.db.table(this.tablename);
  		const data = table.toCollection();
		const result: Record<string, T> = {};
		await data.each(
			(obj: T, cursor) => result[cursor.key.toString()] = obj
		);
  		return result;

	}

}

export class KeyValueTableImpl extends BasicTableImpl<string | number | boolean> implements KeyValueTable {

	constructor(
		db: WolfBaseDB,
		tablename: WolfBaseTableName
	) {
		super(db, tablename);
	}

	async set<T>(key: string, value: T): Promise<void> {

		await this.db.table<T>(this.tablename).put(value, key);

	}

	async get<T>(key: string): Promise<T> {

		return await this.db.table<T>(this.tablename).get(key) as T;

	}

	get$<T>(key: string): Observable<T> {

		return fromEventPattern(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.get(key)).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		);

	}

	async remove(key: string): Promise<void> {

		return await this.db.table<string>(this.tablename).delete(key);

	}

}

// export abstract class AbstractDexieTable<T extends EntityBase> implements BasicTable<T> {

// 	constructor(
// 		protected db: WolfBaseDB,
// 		protected tablename: WolfBaseTableName
// 	) { }

// 	async toArray(): Promise<T[]> {

// 		return await this.db.table(this.tablename).toArray();
	
// 	}

	// async listNewItems(): Promise<T[]> {

	// 	return await this.db
	// 		.table<T>(this.tablename)
	// 		.filter(item => !item.created)
	// 		.toArray();

	// }

	// async listUpdatedItems(): Promise<T[]> {

	// 	await this.db
	// 		.table<T>(this.tablename)
	// 		.filter(item => !!Object.keys(item.updated || {}).length)
	// 		.toArray();

	// }

	// async listDeletedItems(): Promise<ITrash<T>[]> {

	// 	return await this.db
	// 		.trashcan
	// 		.filter(item => item.table === this.tablename)
	// 		.toArray() as ITrash<T>[];

	// }

	// async moveToTrash(id: string): Promise<void> {

	// 	this.db.transaction(
	// 		'rw',
	// 		this.tablename,
	// 		WolfBaseTableName.trashcan,
	// 		async () => {

	// 			const entity: T = await this.db.table(this.tablename).get(id);
	// 			await this.db.table<T>(this.tablename).delete(id);
	// 			await this.db.trashcan.add({
	// 				id: entity.id,
	// 				entity,
	// 				table: this.tablename
	// 			});

	// 		}
	// 	);

	// }

	// async moveToConflicts(localData: T, remoteData: T): Promise<void> {

	// 	this.db.transaction(
	// 		'rw',
	// 		this.tablename,
	// 		WolfBaseTableName.conflicts,
	// 		async () => {

	// 			await this.db.conflicts.add({

	// 				id: localData.id,
	// 				localData,
	// 				remoteData,
	// 				createTime: new Date().toString()

	// 			});
	// 			await this.db.table<T>(this.tablename).delete(localData.id);

	// 		}
	// 	);

	// }

	// async get(id: UUID): Promise<T | undefined> {

	// 	return await this.db.table<T>(this.tablename).get(id);

	// }

	// async list(
	// 	params?: {
	// 		orderBy?: string;
	// 		reverse?: boolean;
	// 		limit?: number
	// 	}
	// ): Promise<T[]> {

	// 	const table: Table<T, IndexableType> = this.db.table<T>(this.tablename);
	// 	let collection: Collection<T, IndexableType>;

	// 	if (params) {
	// 		if (params.orderBy)
	// 			collection = table.orderBy(params.orderBy);
	// 		else
	// 			collection = table.toCollection();

	// 		if (params.reverse)
	// 			collection = collection.reverse();

	// 		if (params.limit)
	// 			collection = collection.limit(params.limit);

	// 		return await collection.toArray();
	// 	}

	// 	return await table.toArray();

	// }

	// list$(
	// 	params?: {
	// 		orderBy?: string;
	// 		reverse?: boolean;
	// 		limit?: number
	// 	}
	// ): Observable<T[]> {

	// 	return fromEventPattern(

	// 		// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
	// 		// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
	// 		// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
	// 		(handler) => liveQuery(() => this.list(params)).subscribe(handler),

	// 		// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
	// 		(handler, unsubscribe) => unsubscribe()

	// 	);

	// }

	// async listIds(): Promise<UUID[]> {

	// 	return await this.db.table<T, UUID>(this.tablename).toCollection().primaryKeys();

	// }

	// async saveAll(items: Partial<T>[]): Promise<void> {

	// 	await this.db.table<T>(this.tablename).bulkPut(
	// 		items.map(data => this.newItemFromPartial(data))
	// 	);

	// }

	// async saveRemoteData(item: T): Promise<void> {

	// 	// const modified = await this.db.table<T>(this.tablename)
	// 	// 	.where({ id: item.id })
	// 	// 	.modify((obj: T, ref: { value: T, primKey: IndexableType }): void => {

	// 	// 		obj.id = item.id;
	// 	// 		obj.syncData = remote.syncData;
	// 	// 		obj.data = { ...obj.data, ...item.data };
	// 	// 		obj.updates = removeOverlappingProperties(obj.updates || {}, item.data);

	// 	// 	});

	// 	// if (modified === 0)
	// 	// 	await this.db.table<T>(this.tablename).add({

	// 	// 		createTime: item.createTime,
	// 	// 		updateTime: item.updateTime,
	// 	// 		data: item.data,
	// 	// 		updates: {}

	// 	// 	});

	// }

	// async saveAllRemoteData(items: T[]): Promise<void> {

	// 	await this.db.table<T>(this.tablename).bulkPut(
	// 		items.map(item => this.newLocalDataFromRemote(item))
	// 	);

	// }

	// async create(item: Partial<T>): Promise<T> {

	// 	const newItem: T = this.newItemFromPartial(item);
	// 	await this.db.table<T>(this.tablename).add(newItem);
	// 	return newItem;

	// }

	// async update(id: UUID, data: Partial<T>): Promise<T> {

	// 	const localData: T | undefined = await this.get(id);
	// 	if (!localData)
	// 		throw new Error(`No data with id ${id} found.`);

	// 	await this.db.table<T>(this.tablename).where('id').equals(id).modify({ ...data });

	// 	return await this.get(id) ?? {} as T;

	// }

	// async delete(id: string): Promise<void> {

	// 	await this.db.trashcan.delete(id);

	// }

	// async search(term: string, orderBy: string = 'id'): Promise<T[]> {

	// 	return (
	// 		await this.db.table<T>(this.tablename)
	// 			.filter(item => this.searchFilter(term, item))
	// 			.sortBy(orderBy)
	// 	);

	// }

	// async searchByTags(tags: string[], orderBy: string = 'id'): Promise<T[]> {

	// 	return (
	// 		await this.db.table(this.tablename)
	// 			.where('tags')
	// 			.anyOf(tags)
	// 			.sortBy(orderBy)
	// 	).map(item => item.data);

	// }

	// async tags(): Promise<Tag[]> {

	// 	const setOfTags: { [key: string]: number } = {};
	// 	await this.db.table(this.tablename).orderBy('tags').eachKey(indexableType => {

	// 		const tag = indexableType.toString();
	// 		setOfTags[tag] = (setOfTags[tag] || 0) + 1;

	// 	});

	// 	const tags: Tag[] = Object.keys(setOfTags).map(id => ({ name, count: setOfTags[id] } as Tag));
	// 	return tags;

	// }

	// protected abstract searchFilter(term: string, item: T): boolean;

	// async clear(): Promise<void> {

	// 	await this.db.table(this.tablename).clear();

	// }

	// protected newItemFromPartial(item: Partial<T>): T {

	// 	const id: UUID = uuidv4();
	// 	return this.newInstance(id, item);

	// }

// 	protected newLocalDataFromRemote(item: T): T {

// 		return {

// 			...this.newInstance(item.id, item),
// 			updated: item.updated,
// 			created: item.created

// 		} as T;

// 	}

// 	protected abstract newInstance(id: UUID, item: Partial<T>): T;

// }
