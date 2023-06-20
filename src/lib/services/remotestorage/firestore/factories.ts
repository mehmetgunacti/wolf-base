import { FirestoreTool } from 'lib/utils/firestore/firestore.tool';
import { BookmarksCollection, TrashcanCollection } from '../remote-storage-collection.interface';
import { TrashcanFirestoreCollection } from './collections';
import { BookmarksFirestoreCollection } from './collections/bookmarks.collection';
import { FirestoreRemoteStorageService } from './firestore.service';

export const remoteStorageServiceFactory = (): FirestoreRemoteStorageService => {

	return new FirestoreRemoteStorageService(
		new FirestoreTool(),
		bookmarksCollectionFactory(),
		trashcanCollectionFactory()
	);

};

export const bookmarksCollectionFactory = (): BookmarksCollection => {

	return new BookmarksFirestoreCollection(new FirestoreTool());

};

export const trashcanCollectionFactory = (): TrashcanCollection => {

	return new TrashcanFirestoreCollection(new FirestoreTool());

}