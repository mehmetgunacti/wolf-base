import { Collection, IndexableType, Table, liveQuery } from 'dexie';
import { UUID, WolfBaseTableName } from 'lib/constants';
import { Bookmark } from 'lib/models';
import { BookmarksTable } from 'lib/services/localstorage/local-storage-table.interface';
import { Observable, fromEventPattern } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { WolfBaseDB } from '../wolfbase.database';
import { BasicTableImpl } from '../dexie.table';

export class BookmarksTableImpl extends BasicTableImpl<Bookmark> implements BookmarksTable {

	constructor(db: WolfBaseDB) {
		super(db, WolfBaseTableName.bookmarks);
	}

	async toArray(): Promise<any[]> {

		return await this.db.table(this.tablename).toArray();
	
	}

	async get(id: UUID): Promise<Bookmark | undefined> {

		return await this.db.table<Bookmark>(this.tablename).get(id);

	}

	create(item: Partial<Bookmark>): Promise<Bookmark>;
	create(items: Partial<Bookmark>[]): Promise<void>;
	async create(items: Partial<Bookmark> | Partial<Bookmark>[]): Promise<Bookmark | void> {

		if (Array.isArray(items)) {

			await this.db.table<Bookmark>(this.tablename).bulkPut(
				items.map(data => this.newItemFromPartial(data))
			);
			return;

		} else {

			const newItem: Bookmark = this.newItemFromPartial(items);
			await this.db.table<Bookmark>(this.tablename).add(newItem);
			return newItem;

		}

	}

	async update(id: string, item: Partial<Bookmark>): Promise<Bookmark> {

		const localData: Bookmark | undefined = await this.get(id);
		if (!localData)
			throw new Error(`No data with id ${id} found.`);

		await this.db.table<Bookmark>(this.tablename).where('id').equals(id).modify({ ...item });

		return await this.get(id) ?? {} as Bookmark;
		
	}

	delete(id: string): Promise<void> {

		throw new Error('Method not implemented.');

	}

	async list(params?: { orderBy?: string | undefined; reverse?: boolean | undefined; limit?: number | undefined; } | undefined): Promise<Bookmark[]> {

		const table: Table<Bookmark, IndexableType> = this.db.table<Bookmark>(this.tablename);
		let collection: Collection<Bookmark, IndexableType>;

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

	list$(params?: { orderBy?: string | undefined; reverse?: boolean | undefined; limit?: number | undefined; } | undefined): Observable<Bookmark[]> {

		return fromEventPattern(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.list(params)).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		);

	}

	listIds(): Promise<string[]> {

		throw new Error('Method not implemented.');

	}

	search(term: string): Promise<Bookmark[]> {

		throw new Error('Method not implemented.');

	}

	searchByTags(tags: string[]): Promise<Bookmark[]> {

		throw new Error('Method not implemented.');

	}

	protected newItemFromPartial(item: Partial<Bookmark>): Bookmark {

		const id: UUID = uuidv4();
		return this.newInstance(id, item);

	}

	protected newInstance(id: UUID, item: Partial<Bookmark>): Bookmark {

		const instance: Bookmark = {

			id,
			name: '',
			title: '',
			tags: [],
			image: '',
			url: [''],
			clicks: 0

		};
		return { ...instance, ...item, id } as Bookmark;

	}

	// protected searchFilter(term: string, item: Bookmark): boolean {

	// 	return new RegExp(term.toLocaleLowerCase()).test(
	// 		(`${item.name} ${item.title} ${item.tags}`).toLocaleLowerCase()
	// 	);

	// }

	// async listClickedItems(): Promise<Click[]> {

	// 	// todo: does not check outgoing clicks
	// 	const items: Bookmark[] = await this.db.bookmarks
	// 		.filter((item: Bookmark) => !!item.clicks)
	// 		.toArray();

	// 	return items.map(item => ({
	// 		id: item.id,
	// 		clicks: item.clicks || 0
	// 	}));

	// }

	// async saveClick(item: Click): Promise<void> {

	// 	// todo
	// 	await this.db.bookmarks
	// 		.where({ id: item.id })
	// 		.modify((bookmark: Bookmark): void => {

	// 			bookmark.clicks = item.clicks;

	// 			// remove 'clicks' from 'outgoing'
	// 			// if (!!bookmark.syncData?.outgoing?.clicks) {

	// 			// 	const { clicks, ...rest } = { ...bookmark.syncData.outgoing };
	// 			// 	bookmark.syncData.outgoing = rest;

	// 			// }

	// 		});

	// }

	// async saveClicks(items: Click[]): Promise<void> {

	// 	for (const item of items)
	// 		await this.saveClick(item);

	// }

	async click(id: string): Promise<void> {

		await this.db.bookmarks
			.where({ id })
			.modify((bookmark: Bookmark): void => { // .modify((item: IBookmark, ref: { value: IBookmark, primKey: IndexableType }): void => {

				bookmark.clicks = (bookmark.clicks ?? 0) + 1;

				// todo
				// add # of clicks to 'outgoing' / increase
				// bookmark.syncData = bookmark.syncData ?? {};
				// bookmark.syncData.outgoing = bookmark.syncData.outgoing ?? {};
				// bookmark.syncData.outgoing.clicks = (bookmark.syncData.outgoing.clicks ?? 0) + 1;

			});
	}

}
