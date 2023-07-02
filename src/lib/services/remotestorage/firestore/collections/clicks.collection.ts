import { environment } from 'environments/environment';
import { UUID } from 'lib/constants/common.constant';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { Click } from 'lib/models/bookmark.model';
import { ClicksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreDTO, FirestoreIncreaseURL, FirestoreListURL } from 'lib/utils';
import { Firestore } from 'lib/utils/firestore/firestore.tool';

export class ClicksFirestoreCollection implements ClicksCollection {

	protected apiKey = environment.firebase.apiKey;
	protected baseURL = environment.firebase.baseURL;
	protected projectId = environment.firebase.projectId;
	protected remoteCollection = RemoteCollection.clicks;
	protected pageSize = '10000';

	constructor(private firestore: Firestore) { }

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
		const items: FirestoreDTO<{ clicks: number }>[] = await this.firestore.list<{ clicks: number }>(url);
		return items.map(dto => this.convertToClick(dto));

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
