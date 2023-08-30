import { UUID } from "lib/constants";
import { RemoteCollection } from "lib/constants/remote.constant";
import { FirestoreConfig, RemoteData, RemoteMetadata } from "lib/models";
import { Entity } from "lib/models/entity.model";
import { Observable, filter, map, switchMap } from "rxjs";
import { FIRESTORE_VALUE, Firestore, FirestoreBatchGetURL, FirestoreConverter, FirestoreCreateURL, FirestoreDTO, FirestoreDocumentURL, FirestoreListURL, FirestorePatchURL } from "services/firestore";
import { RemoteStorageCollection } from "../remote-storage-collection.interface";

export abstract class FirestoreCollection<T extends Entity> implements RemoteStorageCollection<T> {

	protected pageSize = '10000'; // high number => download all

	constructor(
		protected firestore: Firestore,
		protected firestoreConfig: FirestoreConfig,
		protected remoteCollection: RemoteCollection,
		protected converter: FirestoreConverter<T>
	) { }

	upload(item: T): Observable<RemoteData<T>> {

		const url = new FirestorePatchURL(
			this.firestoreConfig,
			this.remoteCollection,
			item.id,
			this.converter.toUpdateMask(item)
		);
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
		return this.firestore.update(url, { fields: requestBody }).pipe(
			map(this.toRemoteData)
		);

	}

	delete(id: UUID): Observable<void> {

		const url = new FirestoreDocumentURL(
			this.firestoreConfig,
			this.remoteCollection,
			id
		);
		return this.firestore.delete(url);

	}

	moveToTrash(id: UUID): Observable<void> {

		return this.downloadOne(id).pipe(

			filter((remoteData): remoteData is RemoteData<T> => remoteData !== null),
			switchMap((remoteData: RemoteData<T>) => this.trash(remoteData.entity)),
			switchMap((remoteData: RemoteData<T>) => this.delete(remoteData.entity.id))

		)

	}

	trash(item: T): Observable<RemoteData<T>> {

		const url = new FirestoreCreateURL(
			this.firestoreConfig,
			`${this.remoteCollection}_trash/${item.id}/items`,
			new Date().toISOString()
		);
		const requestBody: Record<keyof T, FIRESTORE_VALUE> = this.converter.toFirestore(item);
		return this.firestore.create(url, { fields: requestBody }).pipe(
			map(this.toRemoteData)
		);

	}

	downloadOne(id: UUID): Observable<RemoteData<T> | null> {

		const url = new FirestoreDocumentURL(
			this.firestoreConfig,
			this.remoteCollection,
			id
		);
		return this.firestore.get<T>(url).pipe(
			map(dto => dto ? this.toRemoteData(dto) : null)
		)

	}

	downloadMany(ids?: UUID[]): Observable<RemoteData<T>[]> {

		if (ids) {

			const url = new FirestoreBatchGetURL(
				this.firestoreConfig,
				this.remoteCollection,
				ids
			);
			return this.firestore.batchGet<T>(url).pipe(

				map(list => list.map(dto => this.toRemoteData(dto)))

			);

		}

		const url = new FirestoreListURL(
			this.firestoreConfig,
			this.remoteCollection,
			this.pageSize
		);
		return this.firestore.list<T>(url).pipe(

			map(list => list.map(dto => this.toRemoteData(dto)))

		);

	}

	downloadIds(): Observable<RemoteMetadata[]> {

		const url = new FirestoreListURL(
			this.firestoreConfig,
			this.remoteCollection,
			this.pageSize,
			true
		);
		return this.firestore.listIds<T>(url).pipe(

			map(list => list.map(dto => this.toRemoteMetaData(dto)))

		);

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

