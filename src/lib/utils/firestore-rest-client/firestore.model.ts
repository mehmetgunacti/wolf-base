import { RemoteCollection, UUID } from 'lib/constants';
import { FIRESTORE_INTEGER, FIRESTORE_VALUE } from './firestore.constant';
import { FirestoreConfig } from 'lib/models';

export class FirestoreCreateURL {

	constructor(
		public firestoreConfig: FirestoreConfig,
		public collection: string,
		public id: UUID
	) { }

	toURL(): string {

		const { baseURL, projectId, apiKey } = this.firestoreConfig;
		return `${baseURL}projects/${projectId}/databases/(default)/documents/${this.collection}?key=${apiKey}&documentId=${this.id}`;

	}

}

export class FirestorePatchURL {

	constructor(
		public firestoreConfig: FirestoreConfig,
		public collection: RemoteCollection,
		public id: UUID,
		public mask: string
	) { }

	toURL(): string {

		const { baseURL, projectId, apiKey } = this.firestoreConfig;
		return `${baseURL}projects/${projectId}/databases/(default)/documents/${this.collection}/${this.id}?key=${apiKey}&${this.mask}`;

	}

}

export class FirestoreDocumentURL {

	constructor(
		public firestoreConfig: FirestoreConfig,
		public collection: RemoteCollection,
		public document: UUID
	) { }

	toURL(): string {

		const { baseURL, projectId, apiKey } = this.firestoreConfig;
		return `${baseURL}projects/${projectId}/databases/(default)/documents/${this.collection}/${this.document}?key=${apiKey}`;

	}

}

export class FirestoreListURL {

	constructor(
		public firestoreConfig: FirestoreConfig,
		public collection: RemoteCollection,
		public pageSize: string,
		public onlyIds = false
	) { }

	toURL(): string {

		let queryParameters = `pageSize=${this.pageSize}`;
		if (this.onlyIds)
			queryParameters += `&mask.fieldPaths=dummyField`;
		const { baseURL, projectId, apiKey } = this.firestoreConfig;
		return `${baseURL}projects/${projectId}/databases/(default)/documents/${this.collection}?key=${apiKey}&${queryParameters}`;

	}

}

export class FirestoreBatchGetURL {

	constructor(
		public firestoreConfig: FirestoreConfig,
		public collection: RemoteCollection,
		public ids: UUID[]
	) { }

	toURL(): string {

		const { baseURL, projectId, apiKey } = this.firestoreConfig;
		return `${baseURL}projects/${projectId}/databases/(default)/documents:batchGet?key=${apiKey}`;

	}

	toRequestBody(): FirestoreBatchGetRequestBody {

		const { projectId } = this.firestoreConfig;
		return {

			documents: this.ids.map(id => `projects/${projectId}/databases/(default)/documents/${this.collection}/${id}`)

		}

	}

}

export class FirestoreIncreaseURL {

	constructor(
		public firestoreConfig: FirestoreConfig,
		public collection: RemoteCollection,
		public document: string,
		public fieldPath: string,
		public command: string, // e.g. ':commit'
		public amount: number // e.g. 1
	) { }

	toURL(): string {

		const { baseURL, projectId, apiKey } = this.firestoreConfig;
		return `${baseURL}projects/${projectId}/databases/(default)/documents${this.command}?key=${apiKey}`

	}

	toFirestoreWrites(): FirestoreWrites {

		const { projectId } = this.firestoreConfig;
		const requestBody = {
			writes: [
				{
					transform: {
						document: `projects/${projectId}/databases/(default)/documents/${this.collection}/${this.document}`,
						fieldTransforms: [
							{
								fieldPath: this.fieldPath,
								increment: {
									integerValue: this.amount
								}
							}
						]
					}
				}
			]
		};

		return requestBody;

	}

}

export interface FirestoreDTO<T> {

	collection: string;
	document: string;
	createTime: string;
	updateTime: string;
	entity: T;

}

export interface FirestoreDocuments<T> {

	documents: FirestoreDocument<T>[];
	nextPageToken: string;

}

export interface FirestoreDocument<T> {

	name?: string;
	fields?: Record<keyof T, FIRESTORE_VALUE>;
	createTime?: string;
	updateTime?: string;

}

export interface FirestoreWrites {

	writes: {

		transform: {

			document: string;
			fieldTransforms: {

				fieldPath: string;
				increment: FIRESTORE_INTEGER;

			}[];

		}

	}[];
	transaction?: string;

}

export interface FirestoreWriteResult {

	writeResults: {
		transformResults: FIRESTORE_INTEGER[]
	}[];

}

export interface FirestoreConverter<T> {

	toFirestore(item: T | Partial<T>): Record<keyof T, FIRESTORE_VALUE>;
	toUpdateMask(item: Partial<T>): string;

}

export interface FirestoreBatchGetRequestBody {

	documents: string[];

}

export interface FirestoreBatchGetResponse<T> {

	found: FirestoreDocument<T>

}