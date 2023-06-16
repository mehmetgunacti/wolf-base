import { WolfBaseEntity } from 'lib/constants/sync.constant';
import {
	BookmarksCollection,
	RemoteStorageCollection,
	TrashcanCollection
} from './remote-storage-collection.interface';

export interface RemoteStorageService {

	bookmarks: BookmarksCollection;
	trashcan: TrashcanCollection;

	getCollection(name: string): RemoteStorageCollection<WolfBaseEntity>;

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
