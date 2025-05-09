import { UUID } from '@constants/common.constant';
import { AppEntities, AppEntityType } from '@constants/entity.constant';
import { FirestoreConfig } from '@models/configuration.model';
import { Entity } from '@models/entity.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { EntityRemoteRepository } from '@repositories/remote/entity-remote.repository';
import { FirestoreAPIClient } from '@utils/firestore-rest-client/firestore-api.tool';
import { FIRESTORE_VALUE } from '@utils/firestore-rest-client/firestore.constant';
import { FirestoreBatchGetURL, FirestoreConverter, FirestoreCreateURL, FirestoreDocumentURL, FirestoreDTO, FirestoreListURL, FirestorePatchURL } from '@utils/firestore-rest-client/firestore.model';
import { map, Observable } from 'rxjs';

export abstract class FirestoreRemoteStorageCollectionImpl<T extends Entity> implements EntityRemoteRepository<T> {

	protected pageSize = '10000'; // high number => download all
	private collection: string;

	constructor(
		protected firestore: FirestoreAPIClient,
		protected firestoreConfig: FirestoreConfig,
		protected entity: AppEntityType,
		protected converter: FirestoreConverter<T>
	) {
		this.collection = AppEntities[ entity ].plural;
	}

	upload(item: T): Observable<RemoteMetadata> {

		const url = new FirestorePatchURL(
			this.firestoreConfig,
			this.collection,
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
			this.collection,
			id
		);
		return this.firestore.get<T>(url).pipe(

			map(dto => dto ? this.toRemoteData(dto) : null)

		);

	}

	downloadMany(ids: UUID[]): Observable<RemoteData<T>[]> {

		const url = new FirestoreBatchGetURL(
			this.firestoreConfig,
			this.collection,
			ids
		);
		return this.firestore.batchGet<T>(url).pipe(

			map(list => list.map(dto => this.toRemoteData(dto)))

		);

	}

	downloadMetadata(id: UUID): Observable<RemoteMetadata | null> {

		const url = new FirestoreDocumentURL(
			this.firestoreConfig,
			this.collection,
			id,
			true
		);
		return this.firestore.get<T>(url).pipe(

			map(dto => dto ? this.toRemoteMetadata(dto) : null)

		);

	}

	downloadAllMetadata(): Observable<RemoteMetadata[]> {

		const url = new FirestoreListURL(
			this.firestoreConfig,
			this.collection,
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
			this.collection,
			id
		);
		return this.firestore.delete(url);

	}

	trash(item: T): Observable<RemoteData<T>> {

		const url = new FirestoreCreateURL(
			this.firestoreConfig,
			`${this.collection}_trash/${item.id}/items`,
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
			entity: this.converter.fromFirestore({
				...dto.entity,
				id: document
			})

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

