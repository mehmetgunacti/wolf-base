import {
	Bookmark,
	ISODateString,
	LocalStorageService,
	MockFirestoreRemoteStorageService,
	MockLocalStorageService,
	RemoteCollection,
	RemoteStorageService,
	createNBookmarks
} from "lib";
import { MetadataList } from "worker/utils";
import { DownloadClicksAction } from "./download-clicks.actions";

describe('DownloadClicksAction', () => {

	let action: DownloadClicksAction;
	let syncLogId: ISODateString;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;
	let collection: RemoteCollection;

	beforeEach(async () => {

		metadataList = new MetadataList();
		localStorage = new MockLocalStorageService();
		syncLogId = (await localStorage.syncLog.create()).id;
		remoteStorage = new MockFirestoreRemoteStorageService();
		collection = RemoteCollection.bookmarks_clicks;
		action = new DownloadClicksAction(
			localStorage,
			remoteStorage,
			syncLogId,
			collection,
			new MetadataList()
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

		it('downloaded number of clicks should be in local storage', async () => {

			const ID2 = 'id2';

			// click 10 times
			await remoteStorage.clicks.increase(ID2, 10);

			await action.execute();

			const clicks = await localStorage.clicks.list();
			const click2 = clicks.find(c => c.id === ID2);

			expect(click2).toBeTruthy();
			expect(click2?.total).toEqual(10);

		});

	});

});