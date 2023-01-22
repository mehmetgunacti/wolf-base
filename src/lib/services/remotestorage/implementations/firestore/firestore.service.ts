import { IKnobaEntity, RemoteCollection } from 'lib/constants';
import { FirestoreTool } from 'lib/utils';
import { 
	BookmarksCollection,
	// INotesCollection,
	IRemoteStorageCollection,
	// ITasksCollection,
	// IWordsCollection,
	ClicksCollection
} from '../../remote-storage-collection.interface';
import { RemoteStorageService } from '../../remote-storage-service.interface';

export class FirestoreRemoteStorageService extends RemoteStorageService {

	protected pageSize = '10000';

	constructor(
		protected firestore: FirestoreTool,
		public override bookmarks: BookmarksCollection,
		public override clicks: ClicksCollection
	) {
		super(
			bookmarks,
			// notes,
			// tasks,
			// words,
			clicks
		);
	}

	getCollection(name: string): IRemoteStorageCollection<IKnobaEntity> {

		switch (name) {
			case RemoteCollection.bookmarks: return this.bookmarks;
			// case RemoteCollection.notes: return this.notes;
			// case RemoteCollection.tasks: return this.tasks;
			// case RemoteCollection.words: return this.words;
		}
		throw new Error('name is not of type RemoteCollection : [' + name + ']');

	}

}

