import {
	Bookmark,
	LocalStorageService,
	MockFirestoreRemoteStorageService,
	MockLocalStorageService,
	RemoteStorageService,
	createNBookmarks
} from "lib";
import { MetadataList, MockPostServiceImpl, PostService } from "worker/utils";
import { DownloadClicksAction } from "./download-clicks.actions";

describe('DownloadClicksAction', () => {

	let action: DownloadClicksAction;
	let postService: PostService;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		postService = new MockPostServiceImpl();
		localStorage = new MockLocalStorageService();
		remoteStorage = new MockFirestoreRemoteStorageService();
		action = new DownloadClicksAction(
			localStorage,
			remoteStorage,
			postService
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