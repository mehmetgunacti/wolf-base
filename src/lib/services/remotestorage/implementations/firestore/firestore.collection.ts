import { IRemoteStorageCollection } from '../../remote-storage-collection.interface';
import { RemoteCollection, IKnobaEntity, ID } from 'lib/constants';
import { FirestoreTool, IFirestoreDocument, IFirestoreData } from 'lib/utils';
import { Model } from 'lib/models';
import { IRemoteData } from '../../remote-storage-models.interface';

export abstract class AbstractFirestoreCollection<T extends Model> implements IRemoteStorageCollection<T> {

	protected pageSize = '10000';

	constructor(
		protected firestore: FirestoreTool,
		protected remoteCollection: RemoteCollection
	) { }

	async create(item: T): Promise<IRemoteData<T>> {

		const url = this.firestore.createURL({
			collection: this.remoteCollection,
			queryParameters: { documentId: item.id }
		});
		const requestBody: IFirestoreDocument = this.createRequestBody(item);

		const response: IFirestoreData<T> = await this.firestore.create(url, requestBody);
		return this.convert(response);

	}

	async update(id: ID, item: Partial<IKnobaEntity>): Promise<IRemoteData<T>> {

		const url = this.firestore.createURL({
			collection: this.remoteCollection,
			document: id
		});
		const mask = this.createUpdateMask(item);
		const requestBody: IFirestoreDocument = this.createRequestBody(item);

		const response: IFirestoreData<T> = await this.firestore.update(url, mask, requestBody);
		return this.convert(response);

	}

	async delete(id: string): Promise<void> {

		await this.firestore.delete(

			this.firestore.createURL({
				collection: this.remoteCollection,
				document: id
			})

		);

	}

	async get(id: string): Promise<IRemoteData<T>> {

		const response: IFirestoreData<T> = await this.firestore.get<T>(

			this.firestore.createURL({
				document: id,
				collection: this.remoteCollection
			})

		);
		return this.convert(response);

	}

	async list(): Promise<IRemoteData<T>[]> {

		const list: IFirestoreData<T>[] = await this.firestore.list<T>(

			this.firestore.createURL({
				collection: this.remoteCollection,
				queryParameters: { pageSize: this.pageSize }
			})

		);
		return list.map(item => this.convert(item));

	}

	async listIds(): Promise<IRemoteData<ID>[]> {

		const ids: IFirestoreData<T>[] = await this.firestore.list(

			this.firestore.createURL({
				collection: this.remoteCollection,
				queryParameters: { pageSize: this.pageSize, 'mask.fieldPaths': 'dummyFieldNameThatDoesntExist' }
			})

		);

		return ids.map(item => ({

			id: item.id,
			createTime: item.createTime,
			updateTime: item.updateTime,
			data: item.id

		}));

	}

	protected abstract createRequestBody(click: Partial<IKnobaEntity>): IFirestoreDocument;
	protected abstract createUpdateMask(item: Partial<IKnobaEntity>): string;

	private convert(item: IFirestoreData<T>): IRemoteData<T> {

		return {

			id: item.id,
			data: item.data,
			createTime: item.createTime,
			updateTime: item.updateTime

		};

	}

}

