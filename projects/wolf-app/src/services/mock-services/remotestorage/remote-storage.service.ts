import { BookmarksCollection, RemoteStorageService } from '@lib';
import { MockBookmarksCollection } from "./collections/bookmarks.collection";

export class MockRemoteStorageService implements RemoteStorageService {

	bookmarks: BookmarksCollection = new MockBookmarksCollection();

}
