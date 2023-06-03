/// <reference lib="webworker" />

import {
	SyncState,
	LocalStorageService,
	SYNC_STATES,
	sleep
} from 'lib';
import {
	bookmarksCollectionFactory,
	localStorageServiceFactory
} from 'services';
import { BookmarksSyncAction } from './actions';

let isRunning = false;

addEventListener('message', async () => {

	if (isRunning) {

		console.log('already running.');
		return;

	}

	console.log('running batch:');
	isRunning = true;
	const generators: AsyncGenerator<SyncState>[] = createActions();

	for (const gen of generators)
		await process(gen);

	postMessage({ status: SYNC_STATES.DONE });
	isRunning = false;

});

async function process(gen: AsyncGenerator<SyncState>): Promise<void> {

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

function createActions(): AsyncGenerator<SyncState>[] {

	const localStorage: LocalStorageService = localStorageServiceFactory();

	// clicks
	// const clicks = new ClicksSyncAction(

	// 	localStorage.bookmarks,
	// 	clicksRemoteStorageFactory()

	// );

	// bookmarks
	const bookmarks = new BookmarksSyncAction(

		localStorage.bookmarks,
		bookmarksCollectionFactory()

	);



	// order importante
	return [
		bookmarks.execute()
		// words.execute()
	];

}
