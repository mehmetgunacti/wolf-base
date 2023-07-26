import {
	Bookmark,
	LocalStorageService,
	MockFirestoreRemoteStorageService,
	MockLocalStorageService,
	RemoteStorageService,
	createBookmark,
	createNBookmarks
} from "lib";
import { MetadataList, MockPostServiceImpl, PostService } from "worker/utils";
import { BookmarksSyncAction } from "./bookmarks.action";
import { v4 as uuidv4 } from 'uuid';

describe('BookmarksSyncAction', () => {

	let action: BookmarksSyncAction;
	let postService: PostService;
	let localStorage: LocalStorageService;
	let remoteStorage: RemoteStorageService;
	let metadataList: MetadataList;

	beforeEach(async () => {

		metadataList = new MetadataList();
		postService = new MockPostServiceImpl();
		localStorage = new MockLocalStorageService();
		remoteStorage = new MockFirestoreRemoteStorageService();
		action = new BookmarksSyncAction(
			localStorage,
			remoteStorage,
			postService
		);

	});

	describe('execute', () => {

		it('all bookmark tests', async () => {

			const TIMES = 20;

			// create 20 bookmarks locally
			for (let i = 1; i <= TIMES; ++i)
				await localStorage.bookmarks.create(createBookmark(i));

			await action.execute();

			const localItems = await localStorage.bookmarks.list();
			expect(localItems.length).toEqual(TIMES);

			const localSyncData = await localStorage.bookmarks.listSyncData();
			expect(localSyncData.length).toEqual(TIMES);

			const remoteItems = await remoteStorage.bookmarks.downloadMany();
			expect(remoteItems.length).toEqual(TIMES);

		});

		it('all bookmark tests', async () => {

			const mapItems: Map<string, Bookmark> = new Map();

			// create 20 bookmarks locally
			for (let i = 1; i <= 18; ++i)
				mapItems.set('id' + i, await localStorage.bookmarks.create(createBookmark(i)));

			const ID1 = mapItems.get('id1')?.id ?? '--';
			const ID2 = mapItems.get('id2')?.id ?? '--';
			const ID3 = mapItems.get('id3')?.id ?? '--';
			const ID4 = mapItems.get('id4')?.id ?? '--';
			const ID5 = mapItems.get('id5')?.id ?? '--';
			const ID6 = mapItems.get('id6')?.id ?? '--';
			const ID7 = mapItems.get('id7')?.id ?? '--';
			const ID8 = mapItems.get('id8')?.id ?? '--';
			const ID9 = mapItems.get('id9')?.id ?? '--';
			const ID10 = mapItems.get('id10')?.id ?? '--';
			const ID11 = mapItems.get('id11')?.id ?? '--';
			const ID12 = mapItems.get('id12')?.id ?? '--';
			const ID13 = mapItems.get('id13')?.id ?? '--';
			const ID14 = mapItems.get('id14')?.id ?? '--';
			const ID15 = mapItems.get('id15')?.id ?? '--';
			const ID16 = mapItems.get('id16')?.id ?? '--';
			const ID17 = mapItems.get('id17')?.id ?? '--';
			const ID18 = mapItems.get('id18')?.id ?? '--';

			// upload 20 bookmarks
			for (const bookmark of mapItems.values())
				await remoteStorage.bookmarks.upload(bookmark);

			// save locally
			const bookmarks = await remoteStorage.bookmarks.downloadMany();
			for (const b of bookmarks)
				await localStorage.bookmarks.put(b);

			// store ID3 updateTime for later
			const ID3_updateTime = bookmarks.find(rd => rd.metaData.id === ID3)?.metaData.updateTime;
			if (!ID3_updateTime)
				throw new Error(`ID3_updateTime: could not find item with ID: ${ID3}`);

			// store ID12 updateTime for later
			const ID12_updateTime = bookmarks.find(rd => rd.metaData.id === ID12)?.metaData.updateTime;
			if (!ID12_updateTime)
				throw new Error(`ID12_updateTime: could not find item with ID: ${ID12}`);

			// STEPS

			// ID3	updated ID3 locally
			await localStorage.bookmarks.update(ID3, createBookmark(333, ID3));

			// ID8	deleted ID8 locally
			await localStorage.bookmarks.moveToTrash(ID8);

			// ID19	created ID19
			const ID19 = (await localStorage.bookmarks.create(createBookmark(19))).id;

			// ID20	created ID20
			const ID20 = (await localStorage.bookmarks.create(createBookmark(20))).id;

			// ID9	another client deleted ID9
			await remoteStorage.bookmarks.delete(ID9);

			// ID14	another client updated ID14
			await remoteStorage.bookmarks.upload(createBookmark(1414, ID14));

			// ID17	updated ID17 locally
			await localStorage.bookmarks.update(ID17, createBookmark(1717, ID17));

			// ID17	deleted ID17 locally
			await localStorage.bookmarks.moveToTrash(ID17);

			// ID17	another client updated ID17
			await remoteStorage.bookmarks.upload(createBookmark(1717, ID17));

			// ID21	another client created ID21
			const ID21 = (await remoteStorage.bookmarks.upload(createBookmark(21, uuidv4()))).entity.id;

			// ID22	another client created ID22
			const ID22 = (await remoteStorage.bookmarks.upload(createBookmark(22, uuidv4()))).entity.id;

			// ID12	updated ID12 locally
			await localStorage.bookmarks.update(ID12, createBookmark(1212, ID12));

			// ID14	deleted ID14 locally
			await localStorage.bookmarks.moveToTrash(ID14);

			// ID20	deleted ID20 locally
			await localStorage.bookmarks.moveToTrash(ID20);

			// ID23	created ID23 locally
			const ID23 = (await localStorage.bookmarks.create(createBookmark(23))).id;

			// ID23	updated ID23 locally
			await localStorage.bookmarks.update(ID23, createBookmark(2323, ID23));

			// ID6	updated ID6 locally
			await localStorage.bookmarks.update(ID6, createBookmark(6666, ID6));

			// ID22	another client updated ID22
			await remoteStorage.bookmarks.upload(createBookmark(2222, ID22));

			// ID6	deleted ID6 locally
			await localStorage.bookmarks.moveToTrash(ID6);

			// ID6	another client deleted ID6
			await remoteStorage.bookmarks.delete(ID6);

			// ID22	another client updated ID22
			await remoteStorage.bookmarks.upload(createBookmark(222222, ID22));

			await action.execute();

			// ID3
			const ID3_syncData = await localStorage.bookmarks.getSyncData(ID3);
			if (!ID3_syncData)
				throw new Error(`no syncData with id ${ID3}`);
			expect(new Date(ID3_updateTime).getTime()).toBeLessThan(new Date(ID3_syncData.updateTime).getTime());

			// ID6
			expect(await localStorage.bookmarks.get(ID6)).toBeFalsy();
			expect(await localStorage.bookmarks.getSyncData(ID6)).toBeFalsy();

			// ID8
			expect(await localStorage.bookmarks.get(ID8)).toBeFalsy();
			expect(await localStorage.bookmarks.getSyncData(ID8)).toBeFalsy();

			// ID9
			expect((await localStorage.bookmarks.getSyncData(ID9))?.error).toBeTruthy();

			// ID12
			const ID12_syncData = await localStorage.bookmarks.getSyncData(ID12);
			if (!ID12_syncData)
				throw new Error(`no syncData with id ${ID12}`);
			expect(new Date(ID12_updateTime).getTime()).toBeLessThan(new Date(ID12_syncData.updateTime).getTime());

			// ID14
			const ID14_syncData = await localStorage.bookmarks.getSyncData(ID14);
			if (!ID14_syncData)
				throw new Error(`no syncData with id ${ID14}`);
			expect(ID14_syncData.error).toBeTruthy();

			// ID17
			const ID17_syncData = await localStorage.bookmarks.getSyncData(ID17);
			if (!ID17_syncData)
				throw new Error(`no syncData with id ${ID17}`);
			expect(ID17_syncData.error).toBeTruthy();

			// ID20
			expect(await localStorage.bookmarks.get(ID20)).toBeFalsy();
			expect(await localStorage.bookmarks.getSyncData(ID20)).toBeFalsy();

			// ID14 and ID17 in trash
			const deletedItems = (await localStorage.bookmarks.listDeletedItems()).map(item => item.id);
			expect(deletedItems.includes(ID14)).toBeTrue();
			expect(deletedItems.includes(ID17)).toBeTrue();

		});

	});

});