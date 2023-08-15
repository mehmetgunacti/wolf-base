import {
	ISODateString,
	LocalStorageService,
	MockFirestoreRemoteStorageService,
	MockLocalStorageService,
	RemoteCollection,
	RemoteStorageService
} from "lib";
import { MetadataList } from "worker/utils";
import { UploadClicksAction } from "./upload-clicks.actions";

describe('UploadClicksAction', () => {

	let action: UploadClicksAction;
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
		action = new UploadClicksAction(
			localStorage,
			remoteStorage,
			syncLogId,
			collection,
			new MetadataList()
		);

	});

	describe('execute', () => {

		it('clicks should be uploaded to server and click count should be equal', async () => {

			const spyClicks = spyOn(remoteStorage.clicks, 'increase').and.callThrough();

			const ID2 = 'id2';
			const ID11 = 'id11';
			const ID19 = 'id19';

			// click a few
			await localStorage.clicks.click(ID2);
			await localStorage.clicks.click(ID11);
			await localStorage.clicks.click(ID19);

			await action.execute();

			expect(spyClicks).toHaveBeenCalledTimes(3);

			const clicks = await remoteStorage.clicks.downloadMany();
			const click2 = clicks.find(c => c.id === ID2);
			const click11 = clicks.find(c => c.id === ID11);
			const click19 = clicks.find(c => c.id === ID19);

			expect(click2).toBeTruthy();
			expect(click2?.total).toEqual(1);

			expect(click11).toBeTruthy();
			expect(click11?.total).toEqual(1);

			expect(click19).toBeTruthy();
			expect(click19?.total).toEqual(1);

		});

	});

});