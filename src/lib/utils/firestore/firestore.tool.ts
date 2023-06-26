import { HTTP } from '../http.tool';
import { FIRESTORE_TYPE, FIRESTORE_VALUE } from './firestore.constant';
import {
	FirestoreCreateURL,
	FirestoreDTO,
	FirestoreDocument,
	FirestoreDocumentURL,
	FirestoreDocuments,
	FirestoreIncreaseURL,
	FirestoreListURL,
	FirestorePatchURL,
	FirestoreWriteResult,
	FirestoreWrites
} from './firestore.model';

export interface Firestore {

	create<T>(url: FirestoreCreateURL, requestBody: FirestoreDocument<T>): Promise<FirestoreDTO<T>>;
	update<T>(url: FirestorePatchURL, requestBody: FirestoreDocument<T>): Promise<FirestoreDTO<T>>;
	delete(url: FirestoreDocumentURL): Promise<void>;
	list<T>(listUrl: FirestoreListURL): Promise<FirestoreDTO<T>[]>;
	listIds<T>(listUrl: FirestoreListURL): Promise<FirestoreDTO<T>[]>;
	get<T>(url: FirestoreDocumentURL): Promise<FirestoreDTO<T> | null>;
	increase(url: FirestoreIncreaseURL): Promise<number>;

}

export const firestoreFactory = (): Firestore => new FirestoreTool();

class FirestoreTool implements Firestore {

	async create<T>(url: FirestoreCreateURL, requestBody: FirestoreDocument<T>): Promise<FirestoreDTO<T>> {

		return await HTTP.post<FirestoreDocument<T>, FirestoreDocument<T>, FirestoreDTO<T>>(

			url.toURL(),
			requestBody,
			(response: FirestoreDocument<T>): FirestoreDTO<T> => this.parseDocument(response)

		);

	}

	async update<T>(url: FirestorePatchURL, requestBody: FirestoreDocument<T>): Promise<FirestoreDTO<T>> {

		return HTTP.patch<FirestoreDocument<T>, FirestoreDocument<T>, FirestoreDTO<T>>(

			url.toURL(),
			requestBody,
			(response: FirestoreDocument<T>): FirestoreDTO<T> => this.parseDocument(response)

		);

	}

	async delete(url: FirestoreDocumentURL): Promise<void> {

		await HTTP.delete<void, void>(url.toURL());

	}

	async list<T>(listUrl: FirestoreListURL): Promise<FirestoreDTO<T>[]> {

		let url = listUrl.toURL();
		let nextPageToken: string | undefined = '';
		let items: FirestoreDTO<T>[] = [];

		do {

			if (nextPageToken)
				url = `${url}&pageToken=${nextPageToken}`;

			items = [
				...items,
				...await HTTP.get<FirestoreDocuments<T>, FirestoreDTO<T>[]>(
					url,
					(response: FirestoreDocuments<T>): FirestoreDTO<T>[] => {
						nextPageToken = response.nextPageToken;
						return this.parseDocuments(response);
					}
				)
			];

		} while (!!nextPageToken);

		return items;

	}

	async listIds<T>(listUrl: FirestoreListURL): Promise<FirestoreDTO<T>[]> {

		// create url
		listUrl.onlyIds = true;
		let url = listUrl.toURL();

		let nextPageToken: string | undefined = '';
		let items: FirestoreDTO<T>[] = [];

		do {

			if (nextPageToken)
				url = `${url}&pageToken=${nextPageToken}`;

			items = [
				...items,
				...await HTTP.get<FirestoreDocuments<T>, FirestoreDTO<T>[]>(
					url,
					(response: FirestoreDocuments<T>): FirestoreDTO<T>[] => {
						nextPageToken = response.nextPageToken;
						return this.parseDocuments(response);
					}
				)
			];

		} while (!!nextPageToken);

		return items;

	}

	async get<T>(url: FirestoreDocumentURL): Promise<FirestoreDTO<T>> {

		return await HTTP.get<FirestoreDocument<T>, FirestoreDTO<T>>(
			url.toURL(),
			(response: FirestoreDocument<T>) => this.parseDocument(response)
		);

	}

	async increase(url: FirestoreIncreaseURL): Promise<number> {

		return await HTTP.post<FirestoreWriteResult, FirestoreWrites, number>(
			url.toURL(),
			url.toFirestoreWrites(),
			(firebaseResponse: FirestoreWriteResult): number => {
				console.log(firebaseResponse);
				return Number(firebaseResponse?.writeResults[0]?.transformResults[0]?.integerValue);
			}
		);

	}

	private parseDocuments<T>(firestoreResponse: FirestoreDocuments<T>): FirestoreDTO<T>[] {

		return firestoreResponse?.documents?.map((d: FirestoreDocument<T>) => this.parseDocument(d)) || [];

	}

	// todo make parameter 'item' optional (if case no data returns..)
	private parseDocument<T>(item: FirestoreDocument<T>): FirestoreDTO<T> {

		// parse 'document'
		const { collection, document } = this.parseFirestoreURL(item.name ?? '');

		// deconstruct firestore document
		const { fields, createTime, updateTime } = item;

		if (!createTime || !updateTime)
			throw new Error('Firestore data error : [' + JSON.stringify(item) + ']');

		const entity = fields ? this.parseFields(fields) : {} as T;

		// parse syncData
		const dto: FirestoreDTO<T> = {
			collection,
			document,
			createTime,
			updateTime,
			entity
		};


		return dto;

	}

	private parseFirestoreURL(url: string): { collection: string, document: string } {

		const regex = /\/documents\/([^/]+)\/([^/]+)$/;
		const matches = url.match(regex);
		if (matches && matches.length === 3) {

			const collection = matches[1];
			const document = matches[2];
			return { collection, document };

		}
		throw new Error('Invalid Firestore URL: [' + url + ']');

	}

	private parseFields<T>(fields: Record<keyof T, FIRESTORE_VALUE>): T {

		const result: T = {} as T;
		for (const key in fields) {
			const field = fields[key];

			result[key as keyof T] = this.parseField(field) as T[keyof T];
		}
		return result;

	}

	private parseField<T extends string | number | boolean | null>(field: FIRESTORE_VALUE): T {

		if (FIRESTORE_TYPE.stringValue in field)
			return field.stringValue as T;

		if (FIRESTORE_TYPE.integerValue in field)
			return field.integerValue as T;

		if (FIRESTORE_TYPE.doubleValue in field)
			return field.doubleValue as T;

		if (FIRESTORE_TYPE.booleanValue in field)
			return field.booleanValue as T;

		if (FIRESTORE_TYPE.arrayValue in field)
			return field.arrayValue.values.map(v => this.parseField(v)) as unknown as T;

		if (FIRESTORE_TYPE.bytesValue in field)
			return field.bytesValue as T;

		if (FIRESTORE_TYPE.geoPointValue in field)
			return { latitude: 0, longitude: 0, ...field.geoPointValue } as unknown as T;

		if (FIRESTORE_TYPE.mapValue in field)
			return this.parseFields(field.mapValue.fields) as unknown as T;

		if (FIRESTORE_TYPE.nullValue in field)
			return field.nullValue as T;

		if (FIRESTORE_TYPE.referenceValue in field)
			return field.referenceValue as T;

		if (FIRESTORE_TYPE.timestampValue in field)
			return field.timestampValue as T;

		return null as T;

	}

}