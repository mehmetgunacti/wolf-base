import { BookmarksCollection, FIRESTORE_VALUE, FirestoreConverter, FirestoreDTO, FirestoreIncreaseURL, FirestoreListURL, UUID, WolfEntity } from 'lib';
import { FirestoreConfig } from 'lib/models';
import { Bookmark, Click } from 'lib/models/bookmark.model';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';
import { Observable, concatMap, from, map } from 'rxjs';

export class BookmarksFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Bookmark> implements BookmarksCollection {

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			WolfEntity.bookmarks,
			new BookmarkFirestoreConverter()
		);
	}

	uploadClicks(clicks: Click[]): Observable<number> {

		return from(clicks).pipe(

			concatMap(click => this.increase(click.id, click.current)),
			map(() => clicks.length)

		);

	}

	downloadClicks(): Observable<Click[]> {

		const url = new FirestoreListURL(
			this.firestoreConfig,
			this.remoteCollection,
			this.pageSize
		);
		return this.firestore.list<{ clicks: number }>(url).pipe(
			map(items => items.map(dto => this.convertToClick(dto)))
		);

	}

	private increase(id: UUID, amount: number): Observable<number> {

		const url = new FirestoreIncreaseURL(
			this.firestoreConfig,
			WolfEntity.bookmarks + '_clicks',
			id,
			'clicks',
			':commit',
			amount
		);
		return this.firestore.increase(url);

	}

	private convertToClick(dto: FirestoreDTO<{ clicks: number }>): Click {

		const total = dto.entity.clicks;
		const id = dto.document;

		return {

			id,
			total,
			current: 0

		};

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
