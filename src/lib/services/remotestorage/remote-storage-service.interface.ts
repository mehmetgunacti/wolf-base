import { IKnobaEntity } from 'lib/constants';
import {
	IBookmarksCollection,
	// INotesCollection,
	IRemoteStorageCollection,
	// ITasksCollection,
	// IWordsCollection,
	IClicksCollection
} from './remote-storage-collection.interface';

interface IRemoteStorageService {

	getCollection(name: string): IRemoteStorageCollection<IKnobaEntity>;

}

export abstract class RemoteStorageService implements IRemoteStorageService {

	constructor(
		public bookmarks: IBookmarksCollection,
		// public notes: INotesCollection,
		// public tasks: ITasksCollection,
		// public words: IWordsCollection,
		public clicks: IClicksCollection
	) { }

	abstract getCollection(name: string): IRemoteStorageCollection<IKnobaEntity>;

}
