import { UUID } from 'lib/constants';
import { BaseEntity, Bookmark } from 'lib/models';
import { Observable } from 'rxjs';

export interface BasicTableInterface {

	clear(): Promise<void>;

}

export interface EntityTableInterface<T extends BaseEntity> {

	get(id: UUID): Promise<T | undefined>;

	create(item: Partial<T>): Promise<T>;
	create(items: Partial<T>[]): Promise<void>;
	update(id: UUID, item: Partial<T>): Promise<T>;

	delete(id: UUID): Promise<void>;

	list(params?: {
		orderBy?: string;
		reverse?: boolean;
		limit?: number
	}): Promise<T[]>;
	list$(params?: {
		orderBy?: string;
		reverse?: boolean;
		limit?: number
	}): Observable<T[]>;
	listIds(): Promise<UUID[]>;

	search(term: string): Promise<T[]>;
	searchByTags(tags: string[]): Promise<T[]>;

}

export interface KeyValueTableInterface {

	set<T>(key: string, value: T): Promise<void>;
	get<T>(key: string): Promise<T>;
	remove(key: string): Promise<void>;

}

// export interface SyncableTable<T extends Base> {

// 	listNewItems(): Promise<T[]>;
// 	listUpdatedItems(): Promise<T[]>;
// 	listDeletedItems(): Promise<ITrash<T>[]>;

// 	moveToConflicts(localData: T, remoteData: T): Promise<void>;

// }

export interface BookmarksTableInterface extends EntityTableInterface<Bookmark>, BasicTableInterface {

	click(id: UUID): Promise<void>;

}

export interface ConfigurationTableInterface extends BasicTableInterface, KeyValueTableInterface {



}

// export interface INotesTable extends ILocalStorageTable<INote> { }
// export interface ITasksTable extends ILocalStorageTable<ITaskList> { }
// export interface IWordsTable extends ILocalStorageTable<IWord> { }
// export interface IFastsTable extends ILocalStorageTable<IFast> { }
// export interface IWeightsTable extends ILocalStorageTable<IWeight> { }
// export interface IWorkoutsTable extends ILocalStorageTable<IWorkout> { }
