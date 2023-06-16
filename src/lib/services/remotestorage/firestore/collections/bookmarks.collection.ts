import { UUID } from 'lib/constants/common.constant';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark } from 'lib/models/bookmark.model';
import { BookmarksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreTool } from 'lib/utils/firestore/firestore.tool';
import { BookmarkFirestoreConverter } from '../converter';
import { FirestoreCollection } from '../firestore.collection';

export class BookmarksFirestoreCollection extends FirestoreCollection<Bookmark> implements BookmarksCollection {

	constructor(firestore: FirestoreTool) {
		super(firestore, RemoteCollection.bookmarks, new BookmarkFirestoreConverter());
	}

	async increaseClicks(id: UUID, count: number): Promise<Bookmark> {

		await this.firestore.increase(this.remoteCollection, 'clicks', id, count);
		return await this.get(id);

	}

}
