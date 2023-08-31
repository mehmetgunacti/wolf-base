import { BookmarksCollection, ClicksCollection, RemoteStorageService } from "lib";

export class FirestoreRemoteStorageService implements RemoteStorageService {

	protected pageSize = '10000';

	constructor(
		public bookmarks: BookmarksCollection,
		public clicks: ClicksCollection
	) { }

}