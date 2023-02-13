import { Collection, IndexableType, Table } from 'dexie';
import { v4 as uuidv4 } from 'uuid';
import { ILocalStorageTable } from '../../local-storage-table.interface';
import { WolfBaseDB } from './wolfbase.database';
import { ITrash, Tag, Model, ISyncData } from 'lib/models';
import { WolfBaseTable, ID } from 'lib/constants';
import * as _ from 'lodash-es';
import { IRemoteData } from 'lib/services/remotestorage';
import { removeOverlappingProperties } from 'lib/utils';

export abstract class AbstractDexieTable<T extends Model> implements ILocalStorageTable<T> {

	constructor(
		protected db: WolfBaseDB,
		protected tablename: WolfBaseTable
	) { }

	async getNewItems(): Promise<ISyncData<T>[]> {

		return await this.db
			.table<ISyncData<T>>(this.tablename)
			.filter(item => !!!item.createTime)
			.toArray();

	}

	async getUpdatedItems(): Promise<ISyncData<T>[]> {

		return await this.db
			.table<ISyncData<T>>(this.tablename)
			.filter(item => !!Object.keys(item.updates).length)
			.toArray();

	}

	async getDeletedItems(): Promise<ITrash<ISyncData<T>>[]> {

		return await this.db
			.trashcan
			.filter(item => item.table === this.tablename)
			.toArray() as ITrash<ISyncData<T>>[];

	}

	async moveToTrash(id: string): Promise<void> {

		this.db.transaction(
			'rw',
			this.tablename,
			WolfBaseTable.trashcan,
			async () => {

				const entity: ISyncData<T> = await this.db.table(this.tablename).get(id);
				await this.db.table<ISyncData<T>>(this.tablename).delete(id);
				await this.db.trashcan.add({
					id: entity.id,
					entity,
					table: this.tablename
				});

			}
		);

	}

	async moveToConflicts(localData: ISyncData<T>, remoteData: IRemoteData<T>): Promise<void> {

		this.db.transaction(
			'rw',
			this.tablename,
			WolfBaseTable.conflicts,
			async () => {

				await this.db.conflicts.add({

					id: localData.id,
					localData,
					remoteData,
					createTime: new Date().toString()

				});
				await this.db.table<ISyncData<T>>(this.tablename).delete(localData.id);

			}
		);

	}

	async get(id: ID): Promise<ISyncData<T> | undefined> {

		return await this.db.table<ISyncData<T>>(this.tablename).get(id);

	}

	async list(params?: {
		orderBy?: string;
		reverse?: boolean;
		limit?: number
	}): Promise<ISyncData<T>[]> {

		const table: Table<ISyncData<T>, IndexableType> = this.db.table<ISyncData<T>>(this.tablename);
		let collection: Collection<ISyncData<T>, IndexableType>;

		if (params) {
			if (params.orderBy)
				collection = table.orderBy(`data.${params.orderBy}`);
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

	async listIds(): Promise<ID[]> {

		return await this.db.table<T, ID>(this.tablename).toCollection().primaryKeys();

	}

	protected async create(item: T): Promise<ISyncData<T>> {

		const newItem: ISyncData<T> = this.newSyncDataFromPartial(item);
		await this.db.table<ISyncData<T>>(this.tablename).add(newItem);
		return newItem;

	}

	async save(item: T): Promise<ISyncData<T>> {

		if (item.id)
			return this.update(item.id, item);

		else
			return this.create(item);

	}

	async saveAll(items: Partial<T>[]): Promise<void> {

		await this.db.table<ISyncData<T>>(this.tablename).bulkPut(
			items.map(data => this.newSyncDataFromPartial(data))
		);

	}

	async saveRemoteData(item: IRemoteData<T>): Promise<void> {

		const modified = await this.db.table<ISyncData<T>>(this.tablename)
			.where({ id: item.id })
			.modify((obj: ISyncData<T>, ref: { value: ISyncData<T>, primKey: IndexableType }): void => {

				obj.id = item.id;
				obj.createTime = item.createTime;
				obj.updateTime = item.updateTime;
				obj.data = { ...obj.data, ...item.data };
				obj.updates = removeOverlappingProperties(obj.updates, item.data);

			});

		if (modified === 0)
			await this.db.table<ISyncData<T>>(this.tablename).add({

				id: item.id,
				createTime: item.createTime,
				updateTime: item.updateTime,
				data: item.data,
				updates: {}

			});

	}

	async saveAllRemoteData(items: IRemoteData<T>[]): Promise<void> {

		await this.db.table<ISyncData<T>>(this.tablename).bulkPut(
			items.map(item => this.newSyncDataFromRemote(item))
		);

	}

	protected async update(id: ID, data: Partial<T>): Promise<ISyncData<T>> {

		const currentValue = await this.get(id);
		const newValue = _.merge(

			_.cloneDeep(currentValue),
			{
				data,
				updates: data
			} as ISyncData<T>,

		);
		await this.db.table<ISyncData<T>>(this.tablename).put(newValue);
		return newValue;

		// await this.db.table<ISyncData<T>>(this.tablename)
		// 	.where({ id })
		// 	.modify((obj: ISyncData<T>, ref: { value: ISyncData<T>, primKey: IndexableType }): void => {

		// 		ref.value = _.merge(

		// 			_.cloneDeep(obj),
		// 			{
		// 				data,
		// 				updates: data
		// 			} as ISyncData<T>,

		// 		);

		// 	});

	}

	async delete(id: string): Promise<void> {

		await this.db.trashcan.delete(id);

	}

	async search(term: string, orderBy: string = 'id'): Promise<T[]> {

		return (
			await this.db.table<ISyncData<T>>(this.tablename)
				.filter(item => this.searchFilter(term, item))
				.sortBy(orderBy)
		).map(item => item.data);

	}

	async searchByTags(tags: string[], orderBy: string = 'id'): Promise<T[]> {

		return (
			await this.db.table(this.tablename)
				.where('data.tags')
				.anyOf(tags)
				.sortBy(orderBy)
		).map(item => item.data);

	}

	async tags(): Promise<Tag[]> {

		const setOfTags: { [key: string]: number } = {};
		await this.db.table(this.tablename).orderBy('data.tags').eachKey(indexableType => {

			const tag = indexableType.toString();
			setOfTags[tag] = (setOfTags[tag] || 0) + 1;

		});

		const tags: Tag[] = Object.keys(setOfTags).map(id => ({ id, count: setOfTags[id] } as Tag));
		return tags;

	}

	protected abstract searchFilter(term: string, item: ISyncData<T>): boolean;

	async clear(): Promise<void> {

		await this.db.table(this.tablename).clear();

	}

	protected newSyncDataFromPartial(item: Partial<T>): ISyncData<T> {

		const id: ID = uuidv4();
		return {

			id,
			data: { ...this.newInstance(id, item), id },
			updateTime: '',
			createTime: '',
			updates: {}

		} as ISyncData<T>;

	}

	protected newSyncDataFromRemote(item: IRemoteData<T>): ISyncData<T> {

		return {

			id: item.id,
			data: this.newInstance(item.id, item.data),
			updateTime: item.updateTime,
			createTime: item.createTime,
			updates: {}

		};

	}

	protected abstract newInstance(id: ID, item: Partial<T>): T;

}
