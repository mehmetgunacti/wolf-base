import { BookmarksCollection, ClicksCollection } from './remote-storage-collection.interface';

export interface RemoteStorageService {

	bookmarks: BookmarksCollection;
	clicks: ClicksCollection;

}
