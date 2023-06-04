import {
	BookmarksCollection,
	RemoteStorageCollection,
	RemoteStorageService
} from 'lib';
import { IKnobaEntity, RemoteCollection } from 'lib/constants';
import { FirestoreTool } from 'lib/utils';

export class FirestoreRemoteStorageService implements RemoteStorageService {

	protected pageSize = '10000';

	constructor(
		protected firestore: FirestoreTool,
		public bookmarks: BookmarksCollection
	) { }

	getCollection(name: string): RemoteStorageCollection<IKnobaEntity> {

		switch (name) {
			case RemoteCollection.bookmarks: return this.bookmarks;
			// case RemoteCollection.notes: return this.notes;
			// case RemoteCollection.tasks: return this.tasks;
			// case RemoteCollection.words: return this.words;
		}
		throw new Error('name is not of type RemoteCollection : [' + name + ']');

	}

}

