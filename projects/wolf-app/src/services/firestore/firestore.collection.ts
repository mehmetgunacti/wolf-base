import { FIRESTORE_VALUE, FirestoreBatchGetURL, FirestoreConverter, FirestoreCreateURL, FirestoreDTO, FirestoreDocumentURL, FirestoreListURL, FirestorePatchURL, RemoteStorageCollection } from '@lib';
import { UUID, WolfEntity } from "lib/constants";
import { FirestoreConfig, RemoteData, RemoteMetadata } from "lib/models";
import { Entity } from "lib/models/entity.model";
import { FirestoreAPIClient } from "lib/utils/firestore-rest-client/firestore-api.tool";
import { Observable, map } from "rxjs";

export abstract class FirestoreRemoteStorageCollectionImpl<T extends Entity> implements RemoteStorageCollection<T> {

	protected pageSize = '10000'; // high number => download all

	constructor(
		protected firestore: FirestoreAPIClient,
		protected firestoreConfig: FirestoreConfig,
		protected entity: WolfEntity,
		protected converter: FirestoreConverter<T>
	) { }

	upload(item: T): Observable<RemoteMetadata> {

		const url = new FirestorePatchURL(
			this.firestoreConfig,
			this.entity,
			item.id,
			this.converter.toUpdateMask(item)
		);
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
		return this.firestore.update(url, { fields: requestBody }).pipe(

			map(dto => this.toRemoteMetadata(dto))

		);

	}

	download(id: UUID): Observable<RemoteData<T> | null> {

		const url = new FirestoreDocumentURL(
			this.firestoreConfig,
			this.entity,
			id
		);
		return this.firestore.get<T>(url).pipe(
			map(dto => dto ? this.toRemoteData(dto) : null)
		)

	}

	downloadMany(ids: UUID[]): Observable<RemoteData<T>[]> {

		const url = new FirestoreBatchGetURL(
			this.firestoreConfig,
			this.entity,
			ids
		);
		return this.firestore.batchGet<T>(url).pipe(

			map(list => list.map(dto => this.toRemoteData(dto)))

		);

	}

	downloadMetadata(id: UUID): Observable<RemoteMetadata | null> {

		const url = new FirestoreDocumentURL(
			this.firestoreConfig,
			this.entity,
			id,
			true
		);
		return this.firestore.get<T>(url).pipe(

			map(dto => dto ? this.toRemoteMetadata(dto) : null)

		)

	}

	downloadAllMetadata(): Observable<RemoteMetadata[]> {

		const url = new FirestoreListURL(
			this.firestoreConfig,
			this.entity,
			this.pageSize,
			true
		);
		return this.firestore.listIds<T>(url).pipe(

			map(list => list.map(dto => this.toRemoteMetadata(dto)))

		);

	}

	delete(id: UUID): Observable<void> {

		const url = new FirestoreDocumentURL(
			this.firestoreConfig,
			this.entity,
			id
		);
		return this.firestore.delete(url);

	}

	trash(item: T): Observable<RemoteData<T>> {

		const url = new FirestoreCreateURL(
			this.firestoreConfig,
			`${this.entity}_trash/${item.id}/items`,
			new Date().toISOString()
		);
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
		return this.firestore.create(url, { fields: requestBody }).pipe(
			map(dto => this.toRemoteData(dto))
		);

	}

	private toRemoteData(dto: FirestoreDTO<T>): RemoteData<T> {

		const { document, createTime, updateTime } = dto;
		const metaData: RemoteMetadata = {

			id: dto.document,
			name: dto.entity.name,
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

	private toRemoteMetadata(dto: FirestoreDTO<T>): RemoteMetadata {

		const { document, createTime, updateTime } = dto;
		const metaData: RemoteMetadata = {

			id: document,
			name: dto.entity.name,
			createTime,
			updateTime

		};
		return metaData;

	}

}

