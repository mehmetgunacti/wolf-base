import { environment } from "environments/environment";
import { UUID } from "lib/constants";
import { RemoteCollection } from "lib/constants/remote.constant";
import { RemoteData, RemoteMetadata } from "lib/models";
import { Entity } from "lib/models/entity.model";
import { FIRESTORE_VALUE } from "lib/utils";
import { FirestoreConverter, FirestoreCreateURL, FirestoreDTO, FirestoreDocumentURL, FirestoreListURL, FirestorePatchURL } from "lib/utils/firestore/firestore.model";
import { Firestore } from "lib/utils/firestore/firestore.tool";
import { RemoteStorageCollection } from "../remote-storage-collection.interface";

export abstract class FirestoreCollection<T extends Entity> implements RemoteStorageCollection<T> {

	protected pageSize = '10000'; // high number => download all
	protected apiKey = environment.firebase.apiKey;
	protected baseURL = environment.firebase.baseURL;
	protected projectId = environment.firebase.projectId;

	constructor(
		protected firestore: Firestore,
		protected remoteCollection: RemoteCollection,
		protected converter: FirestoreConverter<T>
	) { }

	// async create(item: T): Promise<SyncDTO<T>> {

	// 	const url = new FirestoreCreateURL(
	// 		this.baseURL,
	// 		this.projectId,
	// 		this.apiKey,
	// 		this.remoteCollection,
	// 		item.id
	// 	);
	// 	const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
	// 	return await this.firestore.create(url, { fields: requestBody });

	// }

	async upload(item: T): Promise<RemoteData<T>> {

		const url = new FirestorePatchURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			item.id,
			this.converter.toUpdateMask(item)
		);
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
		return this.toRemoteData(
			await this.firestore.update(url, { fields: requestBody })
		);

	}

	async delete(id: UUID): Promise<void> {

		const url = new FirestoreDocumentURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			id
		);
		await this.firestore.delete(url);

	}

	async moveToTrash(id: UUID): Promise<void> {

		const remoteData = await this.downloadOne(id);
		if (remoteData) {

			await this.delete(id);
			await this.trash(remoteData.entity);

		}

	}

	async trash(item: T): Promise<void> {

		const url = new FirestoreCreateURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			`${this.remoteCollection}_trash/${item.id}/items`,
			new Date().toISOString()
		);
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
		await this.firestore.create(url, { fields: requestBody });

	}

	async downloadOne(id: UUID): Promise<RemoteData<T> | null> {

		const url = new FirestoreDocumentURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			id
		);
		const dto = await this.firestore.get<T>(url);
		if (dto)
			return this.toRemoteData(dto);
		return null;

	}

	async downloadMany(): Promise<RemoteData<T>[]> {

		const url = new FirestoreListURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			this.pageSize
		);
		const list = await this.firestore.list<T>(url);
		return list.map(dto => this.toRemoteData(dto));

	}

	async downloadIds(): Promise<RemoteMetadata[]> {

		const url = new FirestoreListURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			this.pageSize,
			true
		);
		const list = await this.firestore.listIds<T>(url);
		return list.map(dto => this.toRemoteMetaData(dto));

	}

	private toRemoteData(dto: FirestoreDTO<T>): RemoteData<T> {

		const { document, createTime, updateTime } = dto;
		const metaData: RemoteMetadata = {

			id: dto.document,
			createTime,
			updateTime

		};
		const remoteData: RemoteData<T> = {

			metaData,
			entity: {
				...dto.entity,
				id: document
			}

		};
		return remoteData;

	}

	private toRemoteMetaData(dto: FirestoreDTO<T>): RemoteMetadata {

		const { document, createTime, updateTime } = dto;
		const metaData: RemoteMetadata = {

			id: document,
			createTime,
			updateTime

		};
		return metaData;

	}

}

