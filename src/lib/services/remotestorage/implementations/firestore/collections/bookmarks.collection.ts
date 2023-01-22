import { RemoteCollection, ID } from 'blueprints/constants';
import { IBookmark, IClick } from 'blueprints/models';
import { FirestoreTool, IFirestoreData, IFirestoreDocument, FIRESTORE_VALUE } from 'blueprints/tools';
import { AbstractFirestoreCollection } from '../firestore.collection';
import { IBookmarksCollection } from 'blueprints/services/remotestorage/remote-storage-collection.interface';
import { IRemoteData } from 'blueprints/services/remotestorage/remote-storage-models.interface';

export class BookmarksFirestoreCollection extends AbstractFirestoreCollection<IBookmark> implements IBookmarksCollection {

	constructor(firestore: FirestoreTool) {
		super(firestore, RemoteCollection.bookmarks);
	}

	async delete(id: string): Promise<void> {

		await super.delete(id);
		await this.firestore.delete(

			this.firestore.createURL({
				collection: RemoteCollection.clicks,
				document: id
			})

		);

	}

	async list(): Promise<IRemoteData<IBookmark>[]> {

		const bookmarks: IRemoteData<IBookmark>[] = await super.list();
		const clicks: IFirestoreData<IClick>[] = await this.firestore.list<IClick>(

			this.firestore.createURL({
				collection: RemoteCollection.clicks,
				queryParameters: { pageSize: this.pageSize }
			})

		);

		const mapClicks: Map<ID, number> = new Map(clicks.map(click => [click.data.id, click.data.clicks]));
		return bookmarks.map(b => ({ ...b, clicks: mapClicks.get(b.id) || 0 }));

	}

	protected createRequestBody(bookmark: Partial<IBookmark>): IFirestoreDocument {

		const fields: { [key: string]: FIRESTORE_VALUE } = {};

		if (bookmark.name)
			fields.name = { stringValue: bookmark.name };

		if (bookmark.title)
			fields.title = { stringValue: bookmark.title };

		if (bookmark.tags)
			fields.tags = {
				arrayValue: { values: bookmark.tags.map(v => ({ stringValue: v })) }
			};

		if (bookmark.url)
			fields.url = { stringValue: bookmark.url };

		if (bookmark.image)
			fields.image = { stringValue: bookmark.image };

		// if (bookmark.clicks)
		// 	fields.clicks = { integerValue: bookmark.clicks };

		return { fields };
	}

	protected createUpdateMask(bookmark: IBookmark): string {

		// exclude some fields like id, ... from update list
		// also don't update image if no new image was selected
		// (empty image string would delete image on server)

		const fields = new Set<string>();

		if (bookmark.name)
			fields.add('name');

		if (bookmark.title)
			fields.add('title');

		if (bookmark.tags)
			fields.add('tags');

		if (bookmark.url)
			fields.add('url');

		if (bookmark.image?.startsWith('data'))
			fields.add('image');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
