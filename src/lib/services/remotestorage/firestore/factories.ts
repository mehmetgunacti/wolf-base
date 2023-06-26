import { FirestoreTool } from 'lib/utils/firestore/firestore.tool';
import { BookmarksCollection, ClicksCollection } from '../remote-storage-collection.interface';
import { ClicksFirestoreCollection } from './collections';
import { BookmarksFirestoreCollection } from './collections/bookmarks.collection';
import { FirestoreRemoteStorageService } from './firestore.service';

export const remoteStorageServiceFactory = (): FirestoreRemoteStorageService => {

	return new FirestoreRemoteStorageService(
		new FirestoreTool(),
		bookmarksCollectionFactory(),
		clicksCollectionFactory()
	);

};

export const bookmarksCollectionFactory = (): BookmarksCollection => {

	return new BookmarksFirestoreCollection(new FirestoreTool());

};

export const clicksCollectionFactory = (): ClicksCollection => {

	return new ClicksFirestoreCollection(new FirestoreTool());

};