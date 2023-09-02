import { BookmarksCollection, ClicksCollection, RemoteStorageService } from "lib";
import { MockBookmarksCollection } from "./collections/bookmarks.collection";
import { MockClicksCollection } from "./collections/clicks.collection";

export class MockRemoteStorageService implements RemoteStorageService {

	bookmarks: BookmarksCollection = new MockBookmarksCollection();
	clicks: ClicksCollection = new MockClicksCollection();

}