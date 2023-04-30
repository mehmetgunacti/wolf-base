import { UUID } from 'lib/constants';
import { Bookmark, EntityBase } from 'lib/models';
import { Observable } from 'rxjs';

export interface BasicTable {

	clear(): Promise<void>;
	dump<T>(): Promise<Record<string, T>>;

}

export interface EntityTable<T extends EntityBase> extends BasicTable {

	get(id: UUID): Promise<T | undefined>;

	create(item: Partial<T>): Promise<T>;
	create(items: Partial<T>[]): Promise<void>;
	update(id: UUID, item: Partial<T>): Promise<T>;

	delete(id: UUID): Promise<void>;

	list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Promise<T[]>;
	list$(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Observable<T[]>;
	listIds(): Promise<UUID[]>;

	search(term: string): Promise<T[]>;
	searchByTags(tags: string[]): Promise<T[]>;

}

export interface KeyValueTable extends BasicTable {

	set(key: string, value: string): Promise<void>;
	get(key: string): Promise<string>;
	get$(key: string): Observable<string>;
	remove(key: string): Promise<void>;

}

// export interface SyncableTable<T extends Base> {

// 	listNewItems(): Promise<T[]>;
// 	listUpdatedItems(): Promise<T[]>;
// 	listDeletedItems(): Promise<ITrash<T>[]>;

// 	moveToConflicts(localData: T, remoteData: T): Promise<void>;

// }

export interface BookmarksTable extends EntityTable<Bookmark> {

	click(id: UUID): Promise<void>;

}

export interface ConfigurationTable extends KeyValueTable { }

// export interface INotesTable extends ILocalStorageTable<INote> { }
// export interface ITasksTable extends ILocalStorageTable<ITaskList> { }
// export interface IWordsTable extends ILocalStorageTable<IWord> { }
// export interface IFastsTable extends ILocalStorageTable<IFast> { }
// export interface IWeightsTable extends ILocalStorageTable<IWeight> { }
// export interface IWorkoutsTable extends ILocalStorageTable<IWorkout> { }
