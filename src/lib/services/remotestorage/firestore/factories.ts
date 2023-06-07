import { environment } from 'environments/environment';
import { FirestoreTool } from 'lib/utils/firestore/firestore.tool';
import { BookmarksCollection } from '../remote-storage-collection.interface';
import { BookmarksFirestoreCollection } from './collections/bookmarks.collection';
import { FirestoreRemoteStorageService } from './firestore.service';

export const firestoreFactory = (): FirestoreTool => {

	return new FirestoreTool({
		apiKey: environment.firebase.apiKey,
		baseURL: environment.firebase.baseURL,
		projectId: environment.firebase.projectId
	});

};

export const remoteStorageServiceFactory = (): FirestoreRemoteStorageService => {

	const firestore: FirestoreTool = firestoreFactory();
	return new FirestoreRemoteStorageService(
		firestore,
		bookmarksCollectionFactory()
	);

};

export const bookmarksCollectionFactory = (): BookmarksCollection => {

	const firestore = firestoreFactory();
	return new BookmarksFirestoreCollection(firestore);

};
