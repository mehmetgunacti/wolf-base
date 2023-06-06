import { RemoteCollection, UUID } from 'lib/constants';
import { Bookmark } from 'lib/models';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FIRESTORE_VALUE, FirestoreTool, IFirestoreDocument } from 'lib/utils';
import { AbstractFirestoreCollection } from '../firestore.collection';
import { bookmarks } from 'store/bookmark';

export class BookmarksFirestoreCollection extends AbstractFirestoreCollection<Bookmark> implements BookmarksCollection {

	constructor(firestore: FirestoreTool) {
		super(firestore, RemoteCollection.bookmarks);
	}

	protected override createRequestBody(bookmark: Bookmark): IFirestoreDocument<Bookmark> {

		const fields = {} as Record<keyof Bookmark, FIRESTORE_VALUE>;
		fields['name'] = { stringValue: bookmark.name };
		fields['title'] = { stringValue: bookmark.title };
		fields['tags'] = {
			arrayValue: { values: bookmark.tags.map(v => ({ stringValue: v })) }
		};
		fields['urls'] = {
			arrayValue: { values: bookmark.urls.map(v => ({ stringValue: v })) }
		};
		fields['clicks'] = { integerValue: bookmark.clicks };
		fields['created'] = { stringValue: bookmark.created };

		if (bookmark.image)
			fields['image'] = { stringValue: bookmark.image };

		return { fields };

	}

	protected override createUpdateMask(bookmark: Partial<Bookmark>): string {

		// exclude some fields like id, ... from update list
		// also don't update image if no new image was selected
		// (empty image string would delete image on server)

		// 'created' is never updated

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
		
		if (bookmark.clicks)
			fields.add('clicks');

		return Array.from(fields).map(key => `updateMask.fieldPaths=${key}`).join('&');

	}

	async increaseClicks(id: UUID, count: number): Promise<Bookmark> {

		await this.firestore.increase(this.remoteCollection, 'clicks', id, count);
		return await this.get(id);

	}

}
