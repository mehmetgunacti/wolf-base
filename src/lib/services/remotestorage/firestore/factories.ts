import { FirestoreTool } from 'lib/utils/firestore/firestore.tool';
import { BookmarksCollection, TrashcanCollection } from '../remote-storage-collection.interface';
import { BookmarksFirestoreCollection } from './collections/bookmarks.collection';
import { FirestoreRemoteStorageService } from './firestore.service';
import { Entity } from 'lib/models';

export const remoteStorageServiceFactory = (): FirestoreRemoteStorageService => {

	return new FirestoreRemoteStorageService(
		new FirestoreTool(),
		bookmarksCollectionFactory()
	);

};

export const bookmarksCollectionFactory = (): BookmarksCollection => {

	return new BookmarksFirestoreCollection(new FirestoreTool());

};