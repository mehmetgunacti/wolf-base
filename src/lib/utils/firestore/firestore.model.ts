import { RemoteCollection, UUID } from 'lib/constants';
import { FIRESTORE_INTEGER, FIRESTORE_VALUE } from './firestore.constant';

export class FirestoreCreateURL {

	constructor(
		public baseURL: string,
		public projectId: string,
		public apiKey: string,
		public collection: RemoteCollection,
		public id: UUID
	) { }

	toURL(): string {

		return `${this.baseURL}projects/${this.projectId}/databases/(default)/documents/${this.collection}?key=${this.apiKey}&documentId=${this.id}`;

	}

}

export class FirestorePatchURL {

	constructor(
		public baseURL: string,
		public projectId: string,
		public apiKey: string,
		public collection: RemoteCollection,
		public id: UUID,
		public mask: string
	) { }

	toURL(): string {

		return `${this.baseURL}projects/${this.projectId}/databases/(default)/documents/${this.collection}/${this.id}?key=${this.apiKey}&${this.mask}`;

	}

}

export class FirestoreDocumentURL {

	constructor(
		public baseURL: string,
		public projectId: string,
		public apiKey: string,
		public collection: RemoteCollection,
		public document: UUID
	) { }

	toURL(): string {

		return `${this.baseURL}projects/${this.projectId}/databases/(default)/documents/${this.collection}/${this.document}?key=${this.apiKey}`;

	}

}

export class FirestoreListURL {

	constructor(
		public baseURL: string,
		public projectId: string,
		public apiKey: string,
		public collection: RemoteCollection,
		public pageSize: string,
		public onlyIds = false
	) { }

	toURL(): string {

		let queryParameters = `pageSize=${this.pageSize}`;
		if (this.onlyIds)
			queryParameters += `&mask.fieldPaths=dummyField`;
		return `${this.baseURL}projects/${this.projectId}/databases/(default)/documents/${this.collection}?key=${this.apiKey}&${queryParameters}`;

	}

}

export class FirestoreIncreaseURL {

	constructor(
		public baseURL: string,
		public projectId: string,
		public apiKey: string,
		public collection: RemoteCollection,
		public document: string,
		public fieldPath: string,
		public command: string, // e.g. ':commit'
		public amount: number // e.g. 1
	) { }

	toURL(): string {

		return `${this.baseURL}projects/${this.projectId}/databases/(default)/documents${this.command}?key=${this.apiKey}`

	}

	toFirestoreWrites(): FirestoreWrites {

		const requestBody = {
			writes: [
				{
					transform: {
						document: `projects/${this.projectId}/databases/(default)/documents/${this.collection}/${this.document}`,
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
	entity?: T;

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