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
import { UploadDeletedAction } from "./upload-deleted.action";

describe('UploadDeletedAction', () => {

	let action: UploadDeletedAction;
	let postService: PostService;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		postService = new MockPostServiceImpl();
		localStorage = new MockLocalStorageService();
		remoteStorage = new MockFirestoreRemoteStorageService();
		action = new UploadDeletedAction(
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

		it('should not exist in local table, sync table and trash', async () => {

			const spyTrash = spyOn(remoteStorage.bookmarks, 'trash').and.callThrough();
			const spyDelete = spyOn(remoteStorage.bookmarks, 'delete').and.callThrough();

			// download metadataList
			metadataList.setItems(await remoteStorage.bookmarks.downloadIds());

			const ID2 = 'id2';
			
			// create new item
			const created = await localStorage.bookmarks.create(createBookmark(100));
			const ID100 = created.id;

			// delete local items, this will mark syncData.deleted as 'true'
			// delete both newly created and previously synced items
			await localStorage.bookmarks.moveToTrash(ID100);
			await localStorage.bookmarks.moveToTrash(ID2);

			console.log(await localStorage.bookmarks.list());
			console.log(await localStorage.bookmarks.listDeletedItems());

			await action.execute();

			expect(spyTrash).toHaveBeenCalledTimes(2);
			expect(spyDelete).toHaveBeenCalledTimes(1);

			// check local table
			expect(await localStorage.bookmarks.get(ID100)).toBeFalsy();
			expect(await localStorage.bookmarks.get(ID2)).toBeFalsy();

			// check local sync table
			expect(await localStorage.bookmarks.getSyncData(ID100)).toBeFalsy();
			expect(await localStorage.bookmarks.getSyncData(ID2)).toBeFalsy();

			// check local trash table
			const deletedItems = await localStorage.bookmarks.listDeletedItems();
			expect(deletedItems.find(item => item.id === ID100)).toBeFalsy();
			expect(deletedItems.find(item => item.id === ID2)).toBeFalsy();

			// check metadata list
			expect(metadataList.get(ID100)).toBeFalsy();
			expect(metadataList.get(ID2)).toBeFalsy();

		});

		it('should be marked as error', async () => {

			const ID14 = 'id14';

			console.log(await localStorage.bookmarks.getSyncData(ID14));
			console.log(await localStorage.bookmarks.listDeletedItems());
			console.log(await remoteStorage.bookmarks.downloadMany());

			// simulate another client updating remote item
			await remoteStorage.bookmarks.upload(createBookmark(1414, ID14));

			// delete local item
			await localStorage.bookmarks.moveToTrash(ID14);

			// download metadataList
			metadataList.setItems(await remoteStorage.bookmarks.downloadIds());

			console.log(await localStorage.bookmarks.getSyncData(ID14));
			console.log(await localStorage.bookmarks.listDeletedItems());
			console.log(await remoteStorage.bookmarks.downloadMany());

			await action.execute();

			console.log(await localStorage.bookmarks.getSyncData(ID14));
			console.log(await localStorage.bookmarks.listDeletedItems());
			console.log(await remoteStorage.bookmarks.downloadMany());

			const syncData = await localStorage.bookmarks.getSyncData(ID14);
			if (!syncData)
				throw new Error(`syncdata of ${ID14} not found.`);
			expect(syncData.error).toBeTruthy();

		});

	});

});