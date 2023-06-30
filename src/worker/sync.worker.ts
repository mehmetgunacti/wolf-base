/// <reference lib="webworker" />

/*
* DO NOT FORGET:
* Web workers run in a separate thread and don't have direct access to the Angular framework or the DOM.
* This means that the web worker code has to be decoupled from any Angular-specific dependencies.
* Imports with dependencies to DOM APIs (Angular CDK etc.) mess up the compilation of the project!
* Only import pure JavaScript functions or libraries.
* Also, don't use index.ts files when writing import statments inside the lib folder.
*/
import { SyncEvent } from "lib/models/sync.model";
import { localStorageServiceFactory } from "lib/services/localstorage/dexie/factories";
import { LocalStorageService } from "lib/services/localstorage/local-storage-service.interface";
import { remoteStorageServiceFactory } from "lib/services/remotestorage/firestore/factories";
import { sleep } from "lib/utils/helper.tool";
import { BookmarksSyncAction } from "./actions/bookmarks.action";
import { PostService } from "./utils";
import { Action, RemoteStorageService } from "lib";

let isRunning = false;

addEventListener('message', async (a: MessageEvent) => {

	if (isRunning) {

		console.log('already running.');
		return;

	}

	isRunning = true;
	const actions: Action<void, Promise<void>>[] = createActions();

	for (const action of actions)
		await action.execute();

	postMessage({ when: new Date(), message: 'Done.', inProgress: false } as SyncEvent);
	isRunning = false;

});

async function process(gen: AsyncGenerator<SyncEvent>): Promise<void> {

	try {

		for await (const syncState of gen) {

			await sleep(500);
			postMessage(syncState);

		}

	} catch (err) {

		console.error(err);
		postMessage({ message: err });

	}

}

function createActions(): Action<void, Promise<void>>[] {

	const localStorage: LocalStorageService = localStorageServiceFactory();
	const remoteStorage: RemoteStorageService = remoteStorageServiceFactory();
	const postService: PostService = new PostService();

	// bookmarks
	const bookmarks = new BookmarksSyncAction(localStorage, remoteStorage, postService);

	// order importante
	return [
		bookmarks
	];

}
