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
import { DownloadIdsAction } from "./download-ids.action";

describe('DownloadIdsAction', () => {

	let action: DownloadIdsAction;
	let syncLogId: ISODateString;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		localStorage = new MockLocalStorageService();
		syncLogId = (await localStorage.syncLog.create()).id;
		remoteStorage = new MockFirestoreRemoteStorageService();
		action = new DownloadIdsAction(
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

	});

	describe('execute', () => {

		it('metadata list should have all remote ids', async () => {

			await action.execute();

			expect(metadataList.getItems().length).toEqual(20);

		});

	});

});