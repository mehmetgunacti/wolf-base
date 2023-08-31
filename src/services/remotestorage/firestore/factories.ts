import { Firestore, firestoreFactory } from 'services/firestore';
import { ClicksFirestoreCollection } from './collections';
import { BookmarksFirestoreCollection } from './collections/bookmarks.collection';
import { FirestoreConfig } from 'lib/models';
import { BookmarksCollection, ClicksCollection, RemoteStorageService } from 'lib';
import { FirestoreRemoteStorageService } from 'lib/services/firestore.service';

export const remoteStorageServiceFactory = (firestoreConfig: FirestoreConfig): RemoteStorageService => {

	const firestore: Firestore = firestoreFactory();
	return new FirestoreRemoteStorageService(
		bookmarksCollectionFactory(firestore, firestoreConfig),
		clicksCollectionFactory(firestore, firestoreConfig)
	);

};

export const bookmarksCollectionFactory = (firestore: Firestore, firestoreConfig: FirestoreConfig): BookmarksCollection => {

	return new BookmarksFirestoreCollection(firestore, firestoreConfig);

};

export const clicksCollectionFactory = (firestore: Firestore, firestoreConfig: FirestoreConfig): ClicksCollection => {

	return new ClicksFirestoreCollection(firestore, firestoreConfig);

};