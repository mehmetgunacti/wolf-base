import { UUID, RemoteCollection } from 'lib/constants';
import { Click } from 'lib/models';
import { ClicksCollection } from 'lib/services/remotestorage/remote-storage-collection.interface';
import { FirestoreTool, IFirestoreData } from 'lib/utils';

export class ClicksRemoteStorageCollection implements ClicksCollection {

	constructor(private firestore: FirestoreTool) { }

	async increase(id: UUID, item: Click): Promise<Click> {

		const clicks: number = await this.firestore.increase(RemoteCollection.clicks, 'clicks', id, item.clicks);
		return {

			id,
			clicks

		};

	}
	async list(): Promise<Click[]> {

		const list: IFirestoreData<Click>[] = await this.firestore.list<Click>(

			this.firestore.createURL({
				collection: RemoteCollection.clicks,
				queryParameters: { pageSize: '10000' }
			})

		);
		return list.map(item => item.data);

	}

	async delete(id: UUID): Promise<void> {

		await this.firestore.delete(

			this.firestore.createURL({
				collection: RemoteCollection.clicks,
				document: id
			})

		);

	}

}
