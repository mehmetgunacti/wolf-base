import { RemoteCollection } from "lib/constants/remote.constant";
import { WolfBaseEntity } from "lib/constants/sync.constant";
import { FirestoreTool } from "lib/utils/firestore/firestore.tool";
import { BookmarksCollection, ClicksCollection, RemoteStorageCollection } from "../remote-storage-collection.interface";
import { RemoteStorageService } from "../remote-storage-service.interface";

export class FirestoreRemoteStorageService implements RemoteStorageService {

	protected pageSize = '10000';

	constructor(
		protected firestore: FirestoreTool,
		public bookmarks: BookmarksCollection,
		public clicks: ClicksCollection
	) { }

	getCollection(name: string): RemoteStorageCollection<WolfBaseEntity> {

		switch (name) {
			case RemoteCollection.bookmarks: return this.bookmarks;
			// case RemoteCollection.tasks: return this.tasks;
			// case RemoteCollection.words: return this.words;
		}
		throw new Error('name is not of type RemoteCollection : [' + name + ']');

	}

}

