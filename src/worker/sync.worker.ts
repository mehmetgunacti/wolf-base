/// <reference lib="webworker" />

/*
* DO NOT FORGET:
* Web workers run in a separate thread and don't have direct access to the Angular framework or the DOM.
* This means that the web worker code has to be decoupled from any Angular-specific dependencies.
* Imports with dependencies to DOM APIs (Angular CDK etc.) mess up the compilation of the project!
* Only import pure JavaScript functions or libraries.
* Also, don't use index.ts files when writing import statments inside the lib folder.
*/
import { localStorageServiceFactory } from "lib/services/localstorage/dexie/factories";
import { bookmarksCollectionFactory } from "lib/services/remotestorage/firestore/factories";
import { SyncEvent } from "lib/models/sync.model";
import { BookmarksSyncAction } from "./actions/bookmarks.action";
import { SYNC_STATES } from "lib/constants/sync.constant";
import { sleep } from "lib/utils/helper.tool";
import { LocalStorageService } from "lib/services/localstorage/local-storage-service.interface";

let isRunning = false;
console.log('worker  running.');

addEventListener('message', async (a: MessageEvent) => {

	if (isRunning) {

		console.log('already running.');
		return;

	}

	console.log('running batch:', a);
	isRunning = true;
	const generators: AsyncGenerator<SyncEvent>[] = createActions();

	for (const gen of generators)
		await process(gen);

	postMessage({ status: SYNC_STATES.DONE });
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
		postMessage({ status: SYNC_STATES.ERROR, message: err });

	}

}

function createActions(): AsyncGenerator<SyncEvent>[] {

	const localStorage: LocalStorageService = localStorageServiceFactory();

	// bookmarks
	const bookmarks = new BookmarksSyncAction(

		localStorage.bookmarks,
		bookmarksCollectionFactory()

	);

	// order importante
	return [
		bookmarks.execute()
	];

}
