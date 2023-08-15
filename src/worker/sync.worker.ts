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
import { ISODateString, SyncEvent, SyncLog } from "lib/models/sync.model";
import { localStorageServiceFactory } from "lib/services/localstorage/dexie/factories";
import { LocalStorageService } from "lib/services/localstorage/local-storage-service.interface";
import { remoteStorageServiceFactory } from "lib/services/remotestorage/firestore/factories";
import { BookmarksSyncAction } from "./actions/bookmarks.action";
import { BookmarksClicksSyncAction } from "./actions/bookmarks-clicks.action";

let isRunning = false;

addEventListener('message', async (a: MessageEvent) => {

	if (isRunning) {

		console.log('already running.');
		return;

	}

	isRunning = true;

	// create services
	const localStorage: LocalStorageService = localStorageServiceFactory();

	// create syncLog entry
	const syncLog: SyncLog = await localStorage.syncLog.create();

	// retrieve FirestoreConfig
	const firestoreConfig: FirestoreConfig | null = await localStorage.configuration.getFirestoreConfig();
	if (firestoreConfig === null) {

		localStorage.syncLog.finish(syncLog.id, 'No Firestore configuration in database');
		return;

	}
	const remoteStorage: RemoteStorageService = remoteStorageServiceFactory(firestoreConfig);

	// create actions
	const actions: Action<void, Promise<void>>[] = await createActions(localStorage, remoteStorage, syncLog.id);

	// invoke actions
	for (const action of actions)
		await action.execute();

	await localStorage.syncLog.finish(syncLog.id, 'Done.');
	isRunning = false;

});

async function createActions(
	localStorage: LocalStorageService,
	remoteStorage: RemoteStorageService,
	syncLogId: ISODateString
): Promise<Action<void, Promise<void>>[]> {

	// bookmarks
	const bookmarks = new BookmarksSyncAction(localStorage, remoteStorage, syncLogId);
	const bookmarkClicks = new BookmarksClicksSyncAction(localStorage, remoteStorage, syncLogId);

	// order importante
	return [
		bookmarks,
		bookmarkClicks
	];

}
