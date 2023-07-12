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
import { UploadNewAction } from "./upload-new.actions";

describe('UploadNewAction', () => {

	let action: UploadNewAction;
	let postService: PostService;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		postService = new MockPostServiceImpl();
		localStorage = new MockLocalStorageService();
		remoteStorage = new MockFirestoreRemoteStorageService();
		action = new UploadNewAction(
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

		it('local sync table should have newly created item', async () => {

			const partial: Bookmark = createBookmark(100);

			// store newItem locally
			const newItem = await localStorage.bookmarks.create(partial);

			await action.execute();

			const localSyncData = localStorage.bookmarks.getSyncData(newItem.id);

			expect(localSyncData).toBeTruthy();

		});

	});

});