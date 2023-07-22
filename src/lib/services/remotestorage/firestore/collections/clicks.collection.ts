import { UUID } from 'lib/constants/common.constant';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { FirestoreConfig } from 'lib/models';
import { Click } from 'lib/models/bookmark.model';
import { ClicksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreDTO, FirestoreIncreaseURL, FirestoreListURL } from 'lib/utils';
import { Firestore } from 'lib/utils/firestore/firestore.tool';

export class ClicksFirestoreCollection implements ClicksCollection {

	protected remoteCollection = RemoteCollection.bookmarks_clicks;
	protected pageSize = '10000';

	constructor(
		private firestore: Firestore,
		private firestoreConfig: FirestoreConfig
	) { }

	async increase(id: UUID, amount: number): Promise<number> {

		const url = new FirestoreIncreaseURL(
			this.firestoreConfig,
			RemoteCollection.bookmarks_clicks,
			id,
			'clicks',
			':commit',
			amount
		);
		return await this.firestore.increase(url);

	}

	async downloadMany(): Promise<Click[]> {

		const url = new FirestoreListURL(
			this.firestoreConfig,
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

export class MockClicksFirestoreCollection implements ClicksCollection {

	private clicks: Map<string, number> = new Map();

	increase(id: string, amount: number): Promise<number> {

		let current = this.clicks.get(id) ?? 0;
		current += amount;
		this.clicks.set(id, current);
		return Promise.resolve(current);

	}

	downloadMany(): Promise<Click[]> {

		const clicks = Array.from(this.clicks.entries()).map(click => ({

			id: click[0],
			current: 0,
			total: click[1]

		} as Click));
		return Promise.resolve(clicks);

	}

}