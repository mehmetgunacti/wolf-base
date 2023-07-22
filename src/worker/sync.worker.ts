/// <reference lib="webworker" />

/*
* DO NOT FORGET:
* Web workers run in a separate thread and don't have direct access to the Angular framework or the DOM.
* This means that the web worker code has to be decoupled from any Angular-specific dependencies.
* Imports with dependencies to DOM APIs (Angular CDK etc.) mess up the compilation of the project!
* Only import pure JavaScript functions or libraries.
* Also, don't use index.ts files when writing import statments inside the lib folder.
*/
import { Action, FirestoreConfig, RemoteStorageService } from "lib";
import { SyncEvent } from "lib/models/sync.model";
import { localStorageServiceFactory } from "lib/services/localstorage/dexie/factories";
import { LocalStorageService } from "lib/services/localstorage/local-storage-service.interface";
import { remoteStorageServiceFactory } from "lib/services/remotestorage/firestore/factories";
import { BookmarksSyncAction } from "./actions/bookmarks.action";
import { PostService, PostServiceImpl } from "./utils";

let isRunning = false;

addEventListener('message', async (a: MessageEvent) => {

	if (isRunning) {

		console.log('already running.');
		return;

	}

	isRunning = true;

	// create services
	const localStorage: LocalStorageService = localStorageServiceFactory();
	const postService: PostService = new PostServiceImpl();
	// retrieve FirestoreConfig
	const firestoreConfig: FirestoreConfig | null = await localStorage.configuration.getFirestoreConfig();
	if (firestoreConfig === null) {

		postMessage({ when: new Date(), message: 'No Firestore configuration in database', inProgress: false } as SyncEvent);
		return;

	}
	const remoteStorage: RemoteStorageService = remoteStorageServiceFactory(firestoreConfig);

	// create actions
	const actions: Action<void, Promise<void>>[] = createActions(localStorage, remoteStorage, postService);

	// invoke actions
	for (const action of actions)
		await action.execute();

	postMessage({ when: new Date(), message: 'Done.', inProgress: false } as SyncEvent);
	isRunning = false;

});

function createActions(
	localStorage: LocalStorageService,
	remoteStorage: RemoteStorageService,
	postService: PostService
): Action<void, Promise<void>>[] {

	// bookmarks
	const bookmarks = new BookmarksSyncAction(localStorage, remoteStorage, postService);

	// order importante
	return [
		bookmarks
	];

}
