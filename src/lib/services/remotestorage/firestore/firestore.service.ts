import { BookmarksCollection, ClicksCollection } from "../remote-storage-collection.interface";
import { RemoteStorageService } from "../remote-storage-service.interface";
import { MockBookmarksFirestoreCollection, MockClicksFirestoreCollection } from "./collections";

export class FirestoreRemoteStorageService implements RemoteStorageService {

	protected pageSize = '10000';

	constructor(
		public bookmarks: BookmarksCollection,
		public clicks: ClicksCollection
	) { }

}

export class MockFirestoreRemoteStorageService implements RemoteStorageService {

	bookmarks: BookmarksCollection = new MockBookmarksFirestoreCollection();
	clicks: ClicksCollection = new MockClicksFirestoreCollection();

}