import {
	Bookmark,
	LocalStorageService,
	MockFirestoreRemoteStorageService,
	MockLocalStorageService,
	RemoteCollection,
	RemoteStorageService,
	createBookmark,
	createNBookmarks
} from "lib";
import { MetadataList, MockPostServiceImpl, PostService } from "worker/utils";
import { DownloadDeletedAction } from "./download-deleted.action";

describe('DownloadDeletedAction', () => {

	let action: DownloadDeletedAction;
	let postService: PostService;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		postService = new MockPostServiceImpl();
		localStorage = new MockLocalStorageService();
		remoteStorage = new MockFirestoreRemoteStorageService();
		action = new DownloadDeletedAction(
			localStorage,
			remoteStorage,
			postService,
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

		it('remotely deleted items should not be present locally', async () => {

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

			expect(await localStorage.bookmarks.get(ID3)).toBeFalsy();
			expect(await localStorage.bookmarks.get(ID5)).toBeFalsy();
			expect(await localStorage.bookmarks.get(ID9)).toBeFalsy();

			expect(await localStorage.bookmarks.getSyncData(ID3)).toBeFalsy();
			expect(await localStorage.bookmarks.getSyncData(ID5)).toBeFalsy();
			expect(await localStorage.bookmarks.getSyncData(ID9)).toBeFalsy();

		});

		it('updated local items should be marked error', async () => {

			const ID3 = 'id3';

			// update will mark item as updated
			await localStorage.bookmarks.update(ID3, createBookmark(333, ID3));

			await remoteStorage.bookmarks.delete(ID3);

			// download metadataList
			metadataList.setItems(await remoteStorage.bookmarks.downloadIds());

			await action.execute();

			expect(await localStorage.bookmarks.get(ID3)).toBeTruthy();

			const syncData = await localStorage.bookmarks.getSyncData(ID3);
			expect(syncData?.error).toBeTruthy();

		});

	});

});