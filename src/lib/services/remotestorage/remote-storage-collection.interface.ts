import {
	Bookmark,
	EntityBase,
	Click
} from 'lib/models';
import { IKnobaEntity, UUID } from 'lib/constants';

export interface RemoteStorageCollection<T extends EntityBase> {

	get(id: string): Promise<T>;

	create(item: T): Promise<T>;
	update(id: UUID, item: Partial<IKnobaEntity>): Promise<T>;
	delete(id: string): Promise<void>;

	list(): Promise<T[]>;
	listIds(): Promise<UUID[]>;

}

export interface BookmarksCollection extends RemoteStorageCollection<Bookmark> { }
// export interface INotesCollection extends IRemoteStorageCollection<INote> { }
// export interface ITasksCollection extends IRemoteStorageCollection<ITaskList> { }
// export interface IWordsCollection extends IRemoteStorageCollection<IWord> { }
export interface ClicksCollection {

	increase(id: UUID, item: Click): Promise<Click>;
	list(): Promise<Click[]>;
	delete(id: string): Promise<void>;

}

