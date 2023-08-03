import { BookmarksCollection, ClicksCollection } from "../remote-storage-collection.interface";
import { RemoteStorageService } from "../remote-storage-service.interface";

export class FirestoreRemoteStorageService implements RemoteStorageService {

	protected pageSize = '10000';

	constructor(
		public bookmarks: BookmarksCollection,
		public clicks: ClicksCollection
	) { }

}