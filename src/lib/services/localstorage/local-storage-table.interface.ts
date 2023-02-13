import { ID } from 'lib/constants';
import {
	Click,
	ITrash,
	Bookmark,
	Model,
	ISyncData,
	Tag
} from 'lib/models';
import { IRemoteData } from '../remotestorage';

export interface ILocalStorageTable<T extends Model> {

	getNewItems(): Promise<ISyncData<T>[]>;
	getUpdatedItems(): Promise<ISyncData<T>[]>;
	getDeletedItems(): Promise<ITrash<ISyncData<T>>[]>;

	moveToConflicts(localData: ISyncData<T>, remoteData: IRemoteData<T>): Promise<void>;
	moveToTrash(id: string): Promise<void>;
	delete(id: string): Promise<void>;

	get(id: ID): Promise<ISyncData<T> | undefined>;
	list(params?: {
		orderBy?: string;
		reverse?: boolean;
		limit?: number
	}): Promise<ISyncData<T>[]>;
	listIds(): Promise<ID[]>;

	save(item: T): Promise<ISyncData<T>>;
	saveAll(items: Partial<T>[]): Promise<void>;
	saveRemoteData(item: IRemoteData<T>): Promise<void>;
	saveAllRemoteData(items: IRemoteData<T>[]): Promise<void>;

	search(term: string): Promise<T[]>;
	searchByTags(tags: string[]): Promise<T[]>;
	tags(): Promise<Tag[]>;

	clear(): Promise<void>;

}

export interface IBookmarksTable extends ILocalStorageTable<Bookmark> {

	getClickedItems(): Promise<Click[]>;
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
