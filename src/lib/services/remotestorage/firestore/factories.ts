import { Firestore, firestoreFactory } from 'lib/utils/firestore/firestore.tool';
import { BookmarksCollection, ClicksCollection } from '../remote-storage-collection.interface';
import { ClicksFirestoreCollection } from './collections';
import { BookmarksFirestoreCollection } from './collections/bookmarks.collection';
import { FirestoreRemoteStorageService } from './firestore.service';

export const remoteStorageServiceFactory = (): FirestoreRemoteStorageService => {

	const firestore: Firestore = firestoreFactory();
	return new FirestoreRemoteStorageService(
		bookmarksCollectionFactory(firestore),
		clicksCollectionFactory(firestore)
	);

};

export const bookmarksCollectionFactory = (firestore: Firestore): BookmarksCollection => {

	return new BookmarksFirestoreCollection(firestore);

};

export const clicksCollectionFactory = (firestore: Firestore): ClicksCollection => {

	return new ClicksFirestoreCollection(firestore);

};