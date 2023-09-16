import { BookmarksCollection, FIRESTORE_VALUE, FirestoreConverter } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { FirestoreConfig } from 'lib/models';
import { Bookmark } from 'lib/models/bookmark.model';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class BookmarksFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Bookmark> implements BookmarksCollection {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			RemoteCollection.bookmarks,
			new BookmarkFirestoreConverter()
		);
	}

}

class BookmarkFirestoreConverter implements FirestoreConverter<Bookmark> {

	toFirestore(bookmark: Bookmark): Record<keyof Bookmark, FIRESTORE_VALUE> {

		const fields = {} as Record<keyof Bookmark, FIRESTORE_VALUE>;
		fields['name'] = { stringValue: bookmark.name };
		fields['title'] = { stringValue: bookmark.title };
		fields['tags'] = {
			arrayValue: { values: bookmark.tags.map(v => ({ stringValue: v })) }
		};
		fields['urls'] = {
			arrayValue: { values: bookmark.urls.map(v => ({ stringValue: v })) }
		};

		if (bookmark.image)
			fields['image'] = { stringValue: bookmark.image };

		return fields;

	}

	toUpdateMask(bookmark: Partial<Bookmark>): string {

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
