import { AppEntities, AppEntityType, FIRESTORE_VALUE, FirestoreConverter, FirestoreDTO, FirestoreIncreaseURL, FirestoreListURL, UUID } from '@lib';
import { FirestoreConfig } from 'lib/models';
import { Bookmark, Click } from 'lib/models/bookmark.model';
import { BookmarksRemoteRepository } from 'lib/repositories/remote';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { Observable, concatMap, from, map } from 'rxjs';
import { FirestoreRemoteStorageCollectionImpl } from '../firestore.collection';

export class BookmarksFirestoreCollectionImpl extends FirestoreRemoteStorageCollectionImpl<Bookmark> implements BookmarksRemoteRepository {

	private bookmarks_clicks = AppEntities.bookmark.plural + '_clicks';

	constructor(firestore: FirestoreAPIClient, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			AppEntityType.bookmark,
			new BookmarkFirestoreConverter()
		);
	}

	uploadClicks(clicks: Click[]): Observable<Click> {

		return from(clicks).pipe(

			concatMap(click =>

				this.increase(click.id, click.current).pipe(
					map(total => {

						const c: Click = {
							id: click.id,
							current: 0,
							total
						};
						return c;

					})

				)

			)

		);

	}

	downloadClicks(): Observable<Click[]> {

		const url = new FirestoreListURL(
			this.firestoreConfig,
			this.bookmarks_clicks,
			this.pageSize
		);
		return this.firestore.list<{ clicks: number }>(url).pipe(
			map(items => items.map(dto => this.convertToClick(dto)))
		);

	}

	private increase(id: UUID, amount: number): Observable<number> {

		const url = new FirestoreIncreaseURL(
			this.firestoreConfig,
			this.bookmarks_clicks,
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

	fromFirestore(incoming: Bookmark): Bookmark {

		// validate incoming
		let { id, name, title, tags, urls, image } = incoming;
		if (!id)
			throw new Error(`Firestore Bookmark: invalid 'id' value`);

		if (!name)
			throw new Error(`Firestore Bookmark: invalid 'name' value`);

		if (!title)
			throw new Error(`Firestore Bookmark: invalid 'title' value`);

		if (!Array.isArray(tags) || tags.length === 0)
			throw new Error(`Firestore Bookmark: invalid 'tags' value`);

		if (!Array.isArray(urls) || urls.length === 0)
			throw new Error(`Firestore Bookmark: invalid 'urls' value`);

		const validated: Bookmark = {

			id,
			name,
			title,
			tags,
			urls,
			image

		};
		return validated;

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
