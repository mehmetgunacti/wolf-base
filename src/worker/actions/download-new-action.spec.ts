import {
	Bookmark,
	ISODateString,
	LocalStorageService,
	MockFirestoreRemoteStorageService,
	MockLocalStorageService,
	RemoteCollection,
	RemoteStorageService,
	createBookmark,
	createNBookmarks
} from "lib";
import { MetadataList } from "worker/utils";
import { DownloadNewAction } from "./download-new.action";

describe('DownloadNewAction', () => {

	let action: DownloadNewAction;
	let syncLogId: ISODateString;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		localStorage = new MockLocalStorageService();
		syncLogId = (await localStorage.syncLog.create()).id;
		remoteStorage = new MockFirestoreRemoteStorageService();
		action = new DownloadNewAction(
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

		it('local table should have new remote objects', async () => {

			const ID200 = 'id200';
			const newItem200 = createBookmark(200, ID200);

			const ID300 = 'id200';
			const newItem300 = createBookmark(300, ID300);

			// upload item, simulate another client
			await remoteStorage.bookmarks.upload(newItem200);
			await remoteStorage.bookmarks.upload(newItem300);

			// add RemoteData to metadataList
			metadataList.setItems(await remoteStorage.bookmarks.downloadIds());

			await action.execute();

			expect(await localStorage.bookmarks.get(ID200)).toBeTruthy();
			expect(await localStorage.bookmarks.get(ID300)).toBeTruthy();

			expect(await localStorage.bookmarks.getSyncData(ID200)).toBeTruthy();
			expect(await localStorage.bookmarks.getSyncData(ID200)).toBeTruthy();

		});

	});

});