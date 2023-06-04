import { IKnobaEntity } from 'lib/constants';
import {
	BookmarksCollection,
	RemoteStorageCollection,
} from './remote-storage-collection.interface';

export interface RemoteStorageService {

	bookmarks: BookmarksCollection;

	getCollection(name: string): RemoteStorageCollection<IKnobaEntity>;

}

// export abstract class RemoteStorageService implements IRemoteStorageService {

// 	constructor(
// 		public bookmarks: BookmarksCollection,
// 		// public notes: INotesCollection,
// 		// public tasks: ITasksCollection,
// 		// public words: IWordsCollection,
// 		public clicks: ClicksCollection
// 	) { }

// 	abstract getCollection(name: string): IRemoteStorageCollection<IKnobaEntity>;

// }
