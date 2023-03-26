import { ID } from 'lib/constants';
import {
	Click,
	ITrash,
	Bookmark,
	Base,
	Tag
} from 'lib/models';
import { Observable } from 'rxjs';

export interface ILocalStorageTable<T extends Base> {

	listNewItems(): Promise<T[]>;
	listUpdatedItems(): Promise<T[]>;
	listDeletedItems(): Promise<ITrash<T>[]>;

	moveToConflicts(localData: T, remoteData: T): Promise<void>;
	moveToTrash(id: string): Promise<void>;
	delete(id: string): Promise<void>;

	get(id: ID): Promise<T | undefined>;
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
	listIds(): Promise<ID[]>;

	save(item: T): Promise<T>;
	saveAll(items: Partial<T>[]): Promise<void>;
	saveRemoteData(item: T): Promise<void>;
	saveAllRemoteData(items: T[]): Promise<void>;

	search(term: string): Promise<T[]>;
	searchByTags(tags: string[]): Promise<T[]>;
	tags(): Promise<Tag[]>;

	clear(): Promise<void>;

}

export interface IBookmarksTable extends ILocalStorageTable<Bookmark> {

	listClickedItems(): Promise<Click[]>;
	saveClick(item: Click): Promise<void>;
	saveClicks(items: Click[]): Promise<void>;
	click(id: string): Promise<void>;

}

// export interface INotesTable extends ILocalStorageTable<INote> { }
// export interface ITasksTable extends ILocalStorageTable<ITaskList> { }
// export interface IWordsTable extends ILocalStorageTable<IWord> { }
// export interface IFastsTable extends ILocalStorageTable<IFast> { }
// export interface IWeightsTable extends ILocalStorageTable<IWeight> { }
// export interface IWorkoutsTable extends ILocalStorageTable<IWorkout> { }
