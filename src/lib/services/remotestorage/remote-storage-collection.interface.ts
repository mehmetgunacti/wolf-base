import {
	Bookmark,
	Base,
	Click
} from 'lib/models';
import { IKnobaEntity, ID } from 'lib/constants';

export interface IRemoteStorageCollection<T extends Base> {

	get(id: string): Promise<T>;

	create(item: T): Promise<T>;
	update(id: ID, item: Partial<IKnobaEntity>): Promise<T>;
	delete(id: string): Promise<void>;

	list(): Promise<T[]>;
	listIds(): Promise<ID[]>;

}

export interface BookmarksCollection extends IRemoteStorageCollection<Bookmark> { }
// export interface INotesCollection extends IRemoteStorageCollection<INote> { }
// export interface ITasksCollection extends IRemoteStorageCollection<ITaskList> { }
// export interface IWordsCollection extends IRemoteStorageCollection<IWord> { }
export interface ClicksCollection {

	increase(id: ID, item: Click): Promise<Click>;
	list(): Promise<Click[]>;
	delete(id: string): Promise<void>;

}

