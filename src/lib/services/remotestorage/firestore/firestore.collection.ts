import { environment } from "environments/environment";
import { UUID } from "lib/constants/common.constant";
import { RemoteCollection } from "lib/constants/remote.constant";
import { SyncDTO, SyncData } from "lib/models";
import { Entity } from "lib/models/entity.model";
import { FIRESTORE_VALUE, isEnumValue } from "lib/utils";
import { FirestoreConverter, FirestoreCreateURL, FirestoreDTO, FirestoreDocumentURL, FirestoreListURL, FirestorePatchURL } from "lib/utils/firestore/firestore.model";
import { FirestoreTool } from "lib/utils/firestore/firestore.tool";
import { RemoteStorageCollection } from "../remote-storage-collection.interface";

export abstract class FirestoreCollection<T extends Entity> implements RemoteStorageCollection<T> {

	protected pageSize = '10000'; // high number => download all
	protected apiKey = environment.firebase.apiKey;
	protected baseURL = environment.firebase.baseURL;
	protected projectId = environment.firebase.projectId;

	constructor(
		protected firestore: FirestoreTool,
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

	async upload(item: T): Promise<SyncData> {

		const url = new FirestorePatchURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			item.id,
			this.converter.toUpdateMask(item)
		);
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
		return this.toSyncData(
			await this.firestore.update(url, { fields: requestBody })
		);

	}

	async delete(id: string): Promise<void> {

		const url = new FirestoreDocumentURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			id
		);
		await this.firestore.delete(url);

	}

	async downloadOne(id: string): Promise<SyncDTO<T>> {

		const url = new FirestoreDocumentURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			id
		);
		return this.toSyncDTO(await this.firestore.get(url));

	}

	async downloadMany(): Promise<SyncDTO<T>[]> {

		const url = new FirestoreListURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			this.pageSize
		);
		return (await this.firestore.list<T>(url)).map(dto => this.toSyncDTO(dto));

	}

	async downloadIds(): Promise<SyncData[]> {

		const url = new FirestoreListURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			this.pageSize,
			true
		);
		return (await this.firestore.listIds<T>(url)).map(dto => this.toSyncData(dto));

	}

	private toSyncData(dto: FirestoreDTO<T>): SyncData {

		const { collection, document, createTime, updateTime } = dto;
		const syncData: SyncData = {

			collection: isEnumValue(collection, RemoteCollection),
			id: document,
			createTime,
			updateTime

		}

		return syncData;

	}

	private toSyncDTO(dto: FirestoreDTO<T>): SyncDTO<T> {

		const syncData = this.toSyncData(dto);
		return {

			syncData,
			entity: { ...dto.entity, id: syncData.id }

		} as SyncDTO<T>;

	}

}

