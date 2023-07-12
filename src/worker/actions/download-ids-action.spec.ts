import {
	Bookmark,
	LocalStorageService,
	MockFirestoreRemoteStorageService,
	MockLocalStorageService,
	RemoteCollection,
	RemoteStorageService,
	createNBookmarks
} from "lib";
import { MetadataList, MockPostServiceImpl, PostService } from "worker/utils";
import { DownloadIdsAction } from "./download-ids.action";

describe('DownloadIdsAction', () => {

	let action: DownloadIdsAction;
	let postService: PostService;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		postService = new MockPostServiceImpl();
		localStorage = new MockLocalStorageService();
		remoteStorage = new MockFirestoreRemoteStorageService();
		action = new DownloadIdsAction(
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

	});

	describe('execute', () => {

		it('metadata list should have all remote ids', async () => {

			await action.execute();

			expect(metadataList.getItems().length).toEqual(20);

		});

	});

});