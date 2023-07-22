import { Firestore, firestoreFactory } from 'lib/utils/firestore/firestore.tool';
import { BookmarksCollection, ClicksCollection } from '../remote-storage-collection.interface';
import { ClicksFirestoreCollection } from './collections';
import { BookmarksFirestoreCollection } from './collections/bookmarks.collection';
import { FirestoreRemoteStorageService } from './firestore.service';
import { FirestoreConfig } from 'lib/models';

export const remoteStorageServiceFactory = (firestoreConfig: FirestoreConfig): FirestoreRemoteStorageService => {

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