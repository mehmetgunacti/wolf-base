import { ClicksCollection, FirestoreDTO, FirestoreIncreaseURL, FirestoreListURL } from 'lib';
import { UUID } from 'lib/constants/common.constant';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { FirestoreConfig } from 'lib/models';
import { Click } from 'lib/models/bookmark.model';
import { FirestoreAPIClient } from 'lib/utils/firestore-rest-client/firestore-api.tool';
import { Observable, map, of } from 'rxjs';

export class ClicksFirestoreCollectionImpl implements ClicksCollection {

	protected remoteCollection = RemoteCollection.bookmarks_clicks;
	protected pageSize = '10000';

	constructor(
		private firestore: FirestoreAPIClient,
		private firestoreConfig: FirestoreConfig
	) { }

	increase(id: UUID, amount: number): Observable<number> {

		const url = new FirestoreIncreaseURL(
			this.firestoreConfig,
			RemoteCollection.bookmarks_clicks,
			id,
			'clicks',
			':commit',
			amount
		);
		return this.firestore.increase(url);

	}

	downloadMany(): Observable<Click[]> {

		const url = new FirestoreListURL(
			this.firestoreConfig,
			this.remoteCollection,
			this.pageSize
		);
		return this.firestore.list<{ clicks: number }>(url).pipe(
			map(items => items.map(dto => this.convertToClick(dto)))
		);

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