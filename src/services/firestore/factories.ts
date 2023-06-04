import { FirestoreTool } from 'lib/utils';
import { environment } from 'environments/environment';
import {
	BookmarksFirestoreCollection
} from './collections';
import { FirestoreRemoteStorageService } from './firestore.service';
import { BookmarksCollection } from 'lib';

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
