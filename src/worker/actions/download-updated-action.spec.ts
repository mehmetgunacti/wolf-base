import {
	Bookmark,
	ISODateString,
	LocalStorageService,
	MockFirestoreRemoteStorageService,
	MockLocalStorageService,
	RemoteCollection,
	RemoteStorageService,
	createBookmark,
	createNBookmarks,
	sleep
} from "lib";
import { MetadataList } from "worker/utils";
import { DownloadUpdatedAction } from "./download-updated.action";

describe('DownloadUpdatedAction', () => {

	let action: DownloadUpdatedAction;
	let syncLogId: ISODateString;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		localStorage = new MockLocalStorageService();
		syncLogId = (await localStorage.syncLog.create()).id;
		remoteStorage = new MockFirestoreRemoteStorageService();

		action = new DownloadUpdatedAction(
			localStorage,
			remoteStorage,
			syncLogId,
			RemoteCollection.bookmarks,
			metadataList
		);

		// create 1-20 bookmarks
		const localBookmarks: Bookmark[] = createNBookmarks(20);

		// upload 20 bookmarks
		for (const bookmark of localBookmarks)
			await remoteStorage.bookmarks.upload(bookmark);

		// save locally
		const bookmarks = await remoteStorage.bookmarks.downloadMany();
		for (const b of bookmarks)
			await localStorage.bookmarks.put(b);

	});

	describe('execute', () => {

		it('local table item should have an older updateTime', async () => {

			const ID = 'id2';
			const b2 = await localStorage.bookmarks.getSyncData(ID);
			if (!b2)
				throw new Error(`no item with id ${ID} in local storage`);

			// simulation: another client just updated id2 on the server
			await sleep(100);
			const tmp = await remoteStorage.bookmarks.upload(createBookmark(222, ID));

			// add RemoteData to metadataList
			metadataList.setItems(await remoteStorage.bookmarks.downloadIds());

			await action.execute();

			const b2_ = await localStorage.bookmarks.getSyncData(ID);
			if (!b2_)
				throw new Error(`no item with id ${ID} in local storage (after action.execute())`);

			// Test: compare updateTime
			expect(new Date(b2_.updateTime).getTime()).toBeGreaterThan(new Date(b2.updateTime).getTime());

		});

		it('local table item should be marked as error', async () => {

			const ID = 'id2';
			const b2 = await localStorage.bookmarks.getSyncData(ID);
			if (!b2)
				throw new Error(`no item with id ${ID} in local storage`);

			// simulation: another client just updated id2 on the server
			await sleep(100);
			const tmp = await remoteStorage.bookmarks.upload(createBookmark(222, ID));

			await sleep(100);
			await localStorage.bookmarks.update(ID, { name: '222_' });

			// add RemoteData to metadataList
			metadataList.setItems(await remoteStorage.bookmarks.downloadIds());

			await action.execute();

			const b2_ = await localStorage.bookmarks.getSyncData(ID);
			if (!b2_)
				throw new Error(`no item with id ${ID} in local storage (after action.execute())`);

			// Test: compare updateTime
			expect(b2_.error).toBeTruthy();

		});


	});

});