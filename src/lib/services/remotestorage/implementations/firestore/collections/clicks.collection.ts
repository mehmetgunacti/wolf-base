import { ID, RemoteCollection } from 'blueprints/constants';
import { IClick } from 'blueprints/models';
import { IClicksCollection } from 'blueprints/services/remotestorage/remote-storage-collection.interface';
import { FirestoreTool, IFirestoreData } from 'blueprints/tools';

export class ClicksRemoteStorageCollection implements IClicksCollection {

	constructor(private firestore: FirestoreTool) { }

	async increase(id: ID, item: IClick): Promise<IClick> {

		const clicks: number = await this.firestore.increase(RemoteCollection.clicks, 'clicks', id, item.clicks);
		return {

			id,
			clicks

		};

	}
	async list(): Promise<IClick[]> {

		const list: IFirestoreData<IClick>[] = await this.firestore.list<IClick>(

			this.firestore.createURL({
				collection: RemoteCollection.clicks,
				queryParameters: { pageSize: '10000' }
			})

		);
		return list.map(item => item.data);

	}

	async delete(id: ID): Promise<void> {

		await this.firestore.delete(

			this.firestore.createURL({
				collection: RemoteCollection.clicks,
				document: id
			})

		);

	}

}
