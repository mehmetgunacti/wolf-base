import { UUID } from 'lib/constants/common.constant';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { FirestoreConfig } from 'lib/models';
import { Bookmark } from 'lib/models/bookmark.model';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { BookmarkFirestoreConverter } from '../converter';
import { FirestoreCollection } from '../firestore.collection';
import { Firestore, FirestoreIncreaseURL } from 'services/firestore';
import { Observable } from 'rxjs';

export class BookmarksFirestoreCollection extends FirestoreCollection<Bookmark> implements BookmarksCollection {

	constructor(firestore: Firestore, firestoreConfig: FirestoreConfig) {
		super(
			firestore,
			firestoreConfig,
			RemoteCollection.bookmarks,
			new BookmarkFirestoreConverter()
		);
	}

	click(id: UUID, amount: number = 1): Observable<number> {

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

}
