import { FIRESTORE_VALUE } from './firestore.constant';

export interface IFirestoreData<T> {

	id: string;
	data: T;
	created: string;
	updated: string;

}

export interface IFirestoreURLConfig {

	baseUrl?: string;
	projectId?: string;
	collection?: string;
	document?: string;
	command?: string;
	apiKey?: string;
	queryParameters?: { [key: string]: string };

}

export interface IFirestoreDocuments {

	documents: IFirestoreDocument[];
	nextPageToken: string;

}

export interface IFirestoreDocument {

	name?: string;
	fields?: Record<string, FIRESTORE_VALUE>;
	createTime?: string;
	updateTime?: string;

}

export interface IFirestoreWrites {

	writes: {

		transform: {

			document: string;
			fieldTransforms: {

				fieldPath: string;
				increment: { integerValue: number }

			}[];

		}

	}[];
	transaction?: string;

}

export interface IFirestoreWriteResult {

	writeResults: {
		transformResults: { integerValue: number }[]
	}[];

}
