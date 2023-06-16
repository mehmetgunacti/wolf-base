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
import { bookmarksCollectionFactory, remoteStorageServiceFactory } from "lib/services/remotestorage/firestore/factories";
import { SyncEvent } from "lib/models/sync.model";
import { BookmarksSyncAction } from "./actions/bookmarks.action";
import { sleep } from "lib/utils/helper.tool";
import { LocalStorageService } from "lib/services/localstorage/local-storage-service.interface";

let isRunning = false;

addEventListener('message', async (a: MessageEvent) => {

	/*
		1) send newly created
		2) download id-createTime list
		3) start comparing:
				local	|	remote
			---------------------------
				upload					<- remote collection has to be separate from bookmarks
				clicks						only upload click count, ignore return value
							download	<- remote collection to local, but only update 'clicks', not updateTime
							clicks			
							new			<- add to local
							deleted		<- remove ids that are in local list but not in remote list
				deleted					<- date compare, delete remotely or move to conflicts
				updated					<- date compare, update remotely or move to conflicts
							updated		<- date compare all other local items with remote ones, update local or move to conflicts
	*/

	if (isRunning) {

		console.log('already running.');
		return;

	}

	isRunning = true;
	const generators: AsyncGenerator<SyncEvent>[] = createActions();

	for (const gen of generators)
		await process(gen);

	isRunning = false;
	postMessage({ message: 'Done.', inProgress: false } as SyncEvent);

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
