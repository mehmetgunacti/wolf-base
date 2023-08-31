import { BookmarksCollection, ClicksCollection, RemoteStorageService } from "lib";
import { MockBookmarksFirestoreCollection, MockClicksFirestoreCollection } from "./collections";

export class MockFirestoreRemoteStorageService implements RemoteStorageService {

	bookmarks: BookmarksCollection = new MockBookmarksFirestoreCollection();
	clicks: ClicksCollection = new MockClicksFirestoreCollection();

}