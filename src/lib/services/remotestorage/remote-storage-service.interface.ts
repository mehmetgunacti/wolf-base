import { IKnobaEntity } from 'lib/constants';
import {
	BookmarksCollection,
	// INotesCollection,
	IRemoteStorageCollection,
	// ITasksCollection,
	// IWordsCollection,
	ClicksCollection
} from './remote-storage-collection.interface';

interface IRemoteStorageService {

	getCollection(name: string): IRemoteStorageCollection<IKnobaEntity>;

}

export abstract class RemoteStorageService implements IRemoteStorageService {

	constructor(
		public bookmarks: BookmarksCollection,
		// public notes: INotesCollection,
		// public tasks: ITasksCollection,
		// public words: IWordsCollection,
		public clicks: ClicksCollection
	) { }

	abstract getCollection(name: string): IRemoteStorageCollection<IKnobaEntity>;

}
