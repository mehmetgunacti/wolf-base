import { UUID } from 'lib/constants/common.constant';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Bookmark, Click } from 'lib/models/bookmark.model';
import { BookmarksCollection, ClicksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreIncreaseURL, FirestoreListURL } from 'lib/utils';
import { FirestoreTool } from 'lib/utils/firestore/firestore.tool';
import { BookmarkFirestoreConverter } from '../converter';
import { FirestoreCollection } from '../firestore.collection';
import { environment } from 'environments/environment';

export class ClicksFirestoreCollection implements ClicksCollection {

	protected apiKey = environment.firebase.apiKey;
	protected baseURL = environment.firebase.baseURL;
	protected projectId = environment.firebase.projectId;
	protected remoteCollection = RemoteCollection.clicks;
	protected pageSize = '10000';

	constructor(private firestore: FirestoreTool) { }

	async increase(id: UUID, amount: number): Promise<number> {

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

	async downloadMany(): Promise<Click[]> {

		const url = new FirestoreListURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			this.pageSize
		);
		const items = await this.firestore.list<Click>(url);
		return items.map(dto => dto.entity);

	}


}
