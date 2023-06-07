import { UUID } from "lib/constants/common.constant";
import { RemoteCollection } from "lib/constants/remote.constant";
import { EntityBase } from "lib/models/entity-base.model";
import { IFirestoreDocument } from "lib/utils/firestore/firestore.model";
import { FirestoreTool } from "lib/utils/firestore/firestore.tool";
import { RemoteStorageCollection } from "../remote-storage-collection.interface";

export abstract class AbstractFirestoreCollection<T extends EntityBase> implements RemoteStorageCollection<T> {

	protected pageSize = '10000'; // high number => download all

	constructor(
		protected firestore: FirestoreTool,
		protected remoteCollection: RemoteCollection
	) { }

	async create(item: T): Promise<T> {

		const url = this.firestore.createURL({
			collection: this.remoteCollection,
			queryParameters: { documentId: item.id }
		});
		const requestBody: IFirestoreDocument<T> = this.createRequestBody(item);
		const response: T = await this.firestore.create(url, requestBody);
		return response;

	}

	async update(id: UUID, item: Partial<T>): Promise<T> {

		const url = this.firestore.createURL({
			collection: this.remoteCollection,
			document: id
		});
		const mask = this.createUpdateMask(item);
		const requestBody: IFirestoreDocument<T> = this.createRequestBody(item);

		const response: T = await this.firestore.update(url, mask, requestBody);
		return response;

	}

	async delete(id: string): Promise<void> {

		await this.firestore.delete(

			this.firestore.createURL({
				collection: this.remoteCollection,
				document: id
			})

		);

	}

	async get(id: string): Promise<T> {

		const response: T = await this.firestore.get<T>(

			this.firestore.createURL({
				document: id,
				collection: this.remoteCollection
			})

		);
		return response;

	}

	async list(): Promise<T[]> {

		const list: T[] = await this.firestore.list<T>(

			this.firestore.createURL({
				collection: this.remoteCollection,
				queryParameters: { pageSize: this.pageSize }
			})

		);
		return list;

	}

	async listIds(): Promise<UUID[]> {

		const ids: T[] = await this.firestore.list(

			this.firestore.createURL({
				collection: this.remoteCollection,
				queryParameters: { pageSize: this.pageSize, 'mask.fieldPaths': 'dummyField' }
			})

		);

		return ids.map(item => item.id);

	}

	protected abstract createRequestBody(item: T): IFirestoreDocument<T>;
	protected abstract createRequestBody(item: Partial<T>): IFirestoreDocument<T>;
	protected abstract createUpdateMask(item: Partial<T>): string;

	// private convert(item: T): T {

	// 	const { createTime, updateTime, ...rest} = item;
	// 	return {

	// 		...rest,
	// 		sync: {
	// 			createTime,
	// 			updateTime
	// 		}

	// 	};

	// }

}

