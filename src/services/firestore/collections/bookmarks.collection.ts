import { RemoteCollection, UUID } from 'lib/constants';
import { Bookmark, Click } from 'lib/models';
import { FirestoreTool, IFirestoreData, IFirestoreDocument, FIRESTORE_VALUE } from 'lib/utils';
import { AbstractFirestoreCollection } from '../firestore.collection';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';

export class BookmarksFirestoreCollection extends AbstractFirestoreCollection<Bookmark> implements BookmarksCollection {

	constructor(firestore: FirestoreTool) {
		super(firestore, RemoteCollection.bookmarks);
	}

	override async delete(id: string): Promise<void> {

		await super.delete(id);
		await this.firestore.delete(

			this.firestore.createURL({
				collection: RemoteCollection.clicks,
				document: id
			})

		);

	}

	override async list(): Promise<Bookmark[]> {

		const bookmarks: Bookmark[] = await super.list();
		const clicks: IFirestoreData<Click>[] = await this.firestore.list<Click>(

			this.firestore.createURL({
				collection: RemoteCollection.clicks,
				queryParameters: { pageSize: this.pageSize }
			})

		);

		const mapClicks: Map<UUID, number> = new Map(clicks.map(click => [click.id, click.data.clicks]));
		return bookmarks.map(b => ({ ...b, clicks: mapClicks.get(b.id) || 0 }));

	}

	protected createRequestBody(bookmark: Partial<Bookmark>): IFirestoreDocument {

		const fields: { [key: string]: FIRESTORE_VALUE } = {};

		if (bookmark.name)
			fields['name'] = { stringValue: bookmark.name };

		if (bookmark.title)
			fields['title'] = { stringValue: bookmark.title };

		if (bookmark.tags)
			fields['tags'] = {
				arrayValue: { values: bookmark.tags.map(v => ({ stringValue: v })) }
			};

		if (bookmark.urls)
			fields['urls'] = {
				arrayValue: { values: bookmark.urls.map(v => ({ stringValue: v })) }
			};

		if (bookmark.image)
			fields['image'] = { stringValue: bookmark.image };

		// if (bookmark.clicks)
		// 	fields.clicks = { integerValue: bookmark.clicks };

		return { fields };
	}

	protected createUpdateMask(bookmark: Bookmark): string {

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

		if (bookmark.urls)
			fields.add('urls');

		if (bookmark.image?.startsWith('data'))
			fields.add('image');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

}
