import { UUID } from 'lib/constants/common.constant';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreIncreaseURL } from 'lib/utils';
import { Firestore } from 'lib/utils/firestore/firestore.tool';
import { BookmarkFirestoreConverter } from '../converter';
import { FirestoreCollection } from '../firestore.collection';

export class BookmarksFirestoreCollection extends FirestoreCollection<Bookmark> implements BookmarksCollection {

	constructor(firestore: Firestore) {
		super(
			firestore,
			RemoteCollection.bookmarks,
			new BookmarkFirestoreConverter()
		);
	}

	async click(id: UUID, amount: number = 1): Promise<number> {

		const url = new FirestoreIncreaseURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			RemoteCollection.clicks,
			id,
			'clicks',
			':commit',
			amount
		);
		return await this.firestore.increase(url);

	}

}
