import {
	Bookmark,
	IModel,
	Click
} from 'lib/models';
import { IKnobaEntity, ID } from 'lib/constants';
import { IRemoteData } from './remote-storage-models.interface';

export interface IRemoteStorageCollection<T extends IModel> {

	get(id: string): Promise<IRemoteData<T>>;

	create(item: T): Promise<IRemoteData<T>>;
	update(id: ID, item: Partial<IKnobaEntity>): Promise<IRemoteData<T>>;
	delete(id: string): Promise<void>;

	list(): Promise<IRemoteData<T>[]>;
	listIds(): Promise<IRemoteData<ID>[]>;

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

