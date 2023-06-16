import { UUID } from "lib/constants/common.constant";
import { RemoteCollection } from "lib/constants/remote.constant";
import { Entity } from "lib/models/entity.model";
import { FirestoreConverter, FirestoreDocument } from "lib/utils/firestore/firestore.model";
import { FirestoreTool } from "lib/utils/firestore/firestore.tool";
import { RemoteStorageCollection } from "../remote-storage-collection.interface";
import { FIRESTORE_VALUE } from "lib/utils";

export abstract class FirestoreCollection<T extends Entity> implements RemoteStorageCollection<T> {

	protected pageSize = '10000'; // high number => download all

	constructor(
		protected firestore: FirestoreTool,
		protected remoteCollection: RemoteCollection,
		protected converter: FirestoreConverter<T>
	) { }

	async create(item: T): Promise<T> {

		const url = this.firestore.createURL({
			collection: this.remoteCollection,
			queryParameters: { documentId: item.id }
		});
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
		const response: T = await this.firestore.create(url, { fields: requestBody });
		return response;

	}

	async update(id: UUID, item: Partial<T>): Promise<T> {

		const url = this.firestore.createURL({
			collection: this.remoteCollection,
			document: id
		});
		const mask = this.converter.toUpdateMask(item);
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);

		const response: T = await this.firestore.update(url, mask, { fields: requestBody });
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

	async list(onlyIds: boolean = false): Promise<T[]> {

		const list: T[] = await this.firestore.list<T>(

			this.firestore.createURL({
				collection: this.remoteCollection,
				queryParameters: { pageSize: this.pageSize, ...(onlyIds ? { 'mask.fieldPaths': 'dummyField' } : {}) }
			})

		);
		return list;

	}

}

