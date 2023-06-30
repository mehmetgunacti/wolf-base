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

let isRunning = false;

addEventListener('message', async (a: MessageEvent) => {

	if (isRunning) {

		console.log('already running.');
		return;

	}

	isRunning = true;
	const generators: AsyncGenerator<SyncEvent>[] = createActions();

	for (const gen of generators)
		await process(gen);

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

function createActions(): AsyncGenerator<SyncEvent>[] {

	const localStorage: LocalStorageService = localStorageServiceFactory();

	// bookmarks
	const bookmarks = new BookmarksSyncAction(

		localStorageServiceFactory(),
		remoteStorageServiceFactory()

	);

	// order importante
	return [
		bookmarks.execute()
	];

}
