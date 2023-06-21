import { environment } from "environments/environment";
import { RemoteCollection } from "lib/constants/remote.constant";
import { Entity } from "lib/models/entity.model";
import { FIRESTORE_VALUE } from "lib/utils";
import { FirestoreConverter, FirestoreDTO, FirestoreDocumentURL, FirestoreListURL, FirestorePatchURL } from "lib/utils/firestore/firestore.model";
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

	async upload(item: T): Promise<Entity> {

		const url = new FirestorePatchURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			item.id,
			this.converter.toUpdateMask(item)
		);
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
		return this.toEntity(
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

	async downloadOne(id: string): Promise<T> {

		const url = new FirestoreDocumentURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			id
		);
		return this.toEntity(await this.firestore.get(url));

	}

	async downloadMany(): Promise<T[]> {

		const url = new FirestoreListURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			this.pageSize
		);
		const list = await this.firestore.list<T>(url);
		return list.map(dto => this.toEntity(dto));

	}

	async downloadIds(): Promise<Entity[]> {

		const url = new FirestoreListURL(
			this.baseURL,
			this.projectId,
			this.apiKey,
			this.remoteCollection,
			this.pageSize,
			true
		);
		const list = await this.firestore.listIds<T>(url);
		return list.map(dto => this.toEntity(dto));

	}

	private toEntity(dto: FirestoreDTO<T>): T {

		const { document, createTime, updateTime } = dto;
		const entity: T = {

			id: document,
			createTime,
			updateTime,
			...dto.entity

		} as T;

		return entity;

	}

}

