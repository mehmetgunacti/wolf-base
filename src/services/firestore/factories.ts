import { FirestoreTool } from 'lib/utils';
import { environment } from 'environments/environment';
import {
	BookmarksFirestoreCollection,
	// NotesFirestoreCollection,
	// TasksFirestoreCollection,
	// WordsFirestoreCollection,
	ClicksRemoteStorageCollection
} from './collections';
import { FirestoreRemoteStorageService } from './firestore.service';
import { BookmarksCollection, ClicksCollection } from 'lib';

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
		bookmarksCollectionFactory(),
		// notesCollectionFactory(),
		// tasksCollectionFactory(),
		// wordsCollectionFactory(),
		clicksCollectionFactory()
	);

};

export const bookmarksCollectionFactory = (): BookmarksCollection => {

	const firestore = firestoreFactory();
	return new BookmarksFirestoreCollection(firestore);

};

// export const notesCollectionFactory = (): INotesCollection => {

// 	const firestore = firestoreFactory();
// 	return new NotesFirestoreCollection(firestore);

// };

// export const tasksCollectionFactory = (): ITasksCollection => {

// 	const firestore = firestoreFactory();
// 	return new TasksFirestoreCollection(firestore);

// };

// export const wordsCollectionFactory = (): IWordsCollection => {

// 	const firestore = firestoreFactory();
// 	return new WordsFirestoreCollection(firestore);

// };

export const clicksCollectionFactory = (): ClicksCollection => {

	const firestore = firestoreFactory();
	return new ClicksRemoteStorageCollection(firestore);

};
