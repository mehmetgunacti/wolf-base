import { EntityBase } from 'lib/models/entity-base.model';
import { FIRESTORE_VALUE } from './firestore.constant';

export interface IFirestoreData<T extends EntityBase> {

	id: string;
	data: T;
	created: string;
	updated: string;

}

export interface IFirestoreURLConfig<T extends EntityBase> {

	baseUrl?: string;
	projectId?: string;
	collection?: string;
	document?: string;
	command?: string;
	apiKey?: string;
	queryParameters?: Partial<Record<keyof T | 'documentId' | 'key' | 'pageSize' | 'mask.fieldPaths', string>>;

}

export interface IFirestoreDocuments<T extends EntityBase> {

	documents: IFirestoreDocument<T>[];
	nextPageToken: string;

}

export interface IFirestoreDocument<T extends EntityBase> {

	name?: string;
	fields?: Record<keyof T, FIRESTORE_VALUE>;
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
