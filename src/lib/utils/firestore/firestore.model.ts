import { FIRESTORE_VALUE } from './firestore.constant';

export interface FirestoreURLConfig<T> {

	baseUrl?: string;
	projectId?: string;
	collection?: string;
	document?: string;
	command?: string;
	apiKey?: string;
	queryParameters?: Partial<Record<keyof T | 'documentId' | 'key' | 'pageSize' | 'mask.fieldPaths', string>>;

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
				increment: { integerValue: number }

			}[];

		}

	}[];
	transaction?: string;

}

export interface FirestoreWriteResult {

	writeResults: {
		transformResults: { integerValue: number }[]
	}[];

}
