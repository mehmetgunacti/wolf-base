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
import { DownloadDeletedAction } from "./download-deleted.action";

describe('DownloadDeletedAction', () => {

	let action: DownloadDeletedAction;
	let syncLogId: ISODateString;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		localStorage = new MockLocalStorageService();
		syncLogId = (await localStorage.syncLog.create()).id;
		remoteStorage = new MockFirestoreRemoteStorageService();
		action = new DownloadDeletedAction(
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

		it('remotely deleted items should be marked as error locally', async () => {

			const ID3 = 'id3';
			const ID5 = 'id5';
			const ID9 = 'id9';

			// another client deletes some remote items
			await remoteStorage.bookmarks.delete(ID3);
			await remoteStorage.bookmarks.delete(ID5);
			await remoteStorage.bookmarks.delete(ID9);

			// download metadataList
			metadataList.setItems(await remoteStorage.bookmarks.downloadIds());

			await action.execute();

			expect((await localStorage.bookmarks.getSyncData(ID3))?.error).toBeTruthy();
			expect((await localStorage.bookmarks.getSyncData(ID5))?.error).toBeTruthy();
			expect((await localStorage.bookmarks.getSyncData(ID9))?.error).toBeTruthy();

		});

	});

});