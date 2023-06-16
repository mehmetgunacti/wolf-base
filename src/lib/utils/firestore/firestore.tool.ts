import { HTTP } from '../http.tool';
import { FIRESTORE_TYPE, FIRESTORE_VALUE } from './firestore.constant';
import {
	FirestoreDocument,
	FirestoreDocuments,
	FirestoreURLConfig,
	FirestoreWriteResult,
	FirestoreWrites
} from './firestore.model';

export interface IFirestoreConfig {

	apiKey: string;
	baseURL: string;
	projectId: string;

}

export class FirestoreTool {

	constructor(private conf: IFirestoreConfig) { }

	async create<T>(url: string, requestBody: FirestoreDocument<T>): Promise<T> {

		return await HTTP.post<FirestoreDocument<T>, FirestoreDocument<T>, T>(
			url,
			requestBody,
			(response: FirestoreDocument<T>): T => this.parseDocument(response)
		);

	}

	async update<T>(url: string, mask: string, requestBody: FirestoreDocument<T>): Promise<T> {

		return HTTP.patch<FirestoreDocument<T>, FirestoreDocument<T>, T>(
			`${url}&${mask}`,
			requestBody,
			(response: FirestoreDocument<T>): T => this.parseDocument(response)
		);

	}

	async delete(url: string): Promise<void> {

		await HTTP.delete<void, void>(url);

	}

	async list<T>(url: string): Promise<T[]> {

		let nextPageToken: string | undefined = '';
		let items: T[] = [];

		do {

			if (nextPageToken)
				url = `${url}&pageToken=${nextPageToken}`;

			items = [
				...items,
				...await HTTP.get<FirestoreDocuments<T>, T[]>(
					url,
					(response: FirestoreDocuments<T>): T[] => {
						nextPageToken = response.nextPageToken;
						return this.parseDocuments(response);
					}
				)
			];

		} while (!!nextPageToken);

		return items;

	}

	async get<T>(url: string): Promise<T> {

		return await HTTP.get<FirestoreDocument<T>, T>(
			url,
			(response: FirestoreDocument<T>) => this.parseDocument(response)
		);

	}

	async increase(collection: string, fieldPath: string, id: string, amount: number = 1): Promise<number> {

		const url = this.createURL({
			collection: '', // no collectionId (bookmarks) this time
			command: ':commit'
		});
		const requestBody: FirestoreWrites = this.createFirestoreWrites(id, collection, fieldPath, amount);

		return await HTTP.post<FirestoreWriteResult, FirestoreWrites, number>(
			url,
			requestBody,
			(firebaseResponse: FirestoreWriteResult): number => Number(firebaseResponse?.writeResults[0]?.transformResults[0]?.integerValue)
		);

	}

	createURL<T>({

		baseUrl = this.conf.baseURL,
		projectId = this.conf.projectId,
		collection = '',
		document = '',
		command = '',
		apiKey = this.conf.apiKey,
		queryParameters = {}

	}: FirestoreURLConfig<T>): string {

		let url = `${baseUrl}projects/${projectId}/databases/(default)/documents`;

		if (collection)
			url += `/${collection}`;

		if (document)
			url += `/${document}`;

		if (command)
			url += `${command}`;

		if (apiKey)
			queryParameters['key'] = apiKey;

		Object.keys(queryParameters).forEach(
			(param, idx) => {

				const key = param as keyof typeof queryParameters;
				url += (idx === 0 ? '?' : '&') + `${param}=${queryParameters[key]}`;

			}
		);

		return url;

	}

	createFirestoreWrites(id: string, collection: string, fieldPath: string, amount: number): FirestoreWrites {

		const requestBody = {
			writes: [
				{
					transform: {
						document: this.createURL({ collection, document: id, apiKey: '', baseUrl: '' }),
						fieldTransforms: [
							{
								fieldPath,
								increment: {
									integerValue: amount
								}
							}
						]
					}
				}
			]
		};

		return requestBody;

	}

	parseDocuments<T>(firestoreResponse: FirestoreDocuments<T>): T[] {

		return firestoreResponse?.documents?.map((d: FirestoreDocument<T>) => this.parseDocument(d)) || [];

	}

	parseDocument<T>(item: FirestoreDocument<T>): T {

		// parse 'id'
		const id: string | null = this.parseId(item);
		if (id === null)
			throw new Error('Firestore Object Id error : [' + JSON.stringify(item) + ']');

		// construct Entity
		const { fields, createTime, updateTime } = item;
		return {

			...(fields ? this.parseFields(fields) : {}),
			id,
			sync: {
				created: createTime ?? '',
				updated: updateTime ?? ''
			}

		} as T;

	}

	parseId<T>(item: FirestoreDocument<T>): string | null {

		if (item.name)
			return item.name?.substring(item.name.lastIndexOf('/') + 1);

		return null;

	}

	parseFields<T>(fields: Record<keyof T, FIRESTORE_VALUE>): T {

		const result: T = {} as T;
		for (const key in fields) {
			const field = fields[key];

			result[key as keyof T] = this.parseField(field) as T[keyof T];
		}
		return result;

	}

	parseField<T extends string | number | boolean | null>(field: FIRESTORE_VALUE): T {

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

	// parseFields<E>(fields: Record<keyof E, FIRESTORE_VALUE>): E {

	// 	const parsedObject: E = {} as E;
	// 	Object
	// 		.keys(fields)
	// 		.forEach(
	// 			key => parsedObject[key as keyof E] = this.parseField(fields[key as keyof E])
	// 		);
	// 	return parsedObject;

	// }

	// parseField(field: FIRESTORE_VALUE): any {

	// 	const key: string = Object.keys(field)[0];
	// 	switch (key) {

	// 		// case FIRESTORE_TYPE.doubleValue:
	// 		case FIRESTORE_TYPE.integerValue:
	// 			return field. [key] as number;

	// 		case FIRESTORE_TYPE.arrayValue:
	// 			return (field[key] && field[key].values || []).map((v: Record<string, any>) => this.parseField(v));

	// 		case FIRESTORE_TYPE.mapValue:
	// 			return this.parseFields(field[key] && field[key].fields || {});

	// 		// case FIRESTORE_TYPE.geoPointValue:
	// 		// 	return { latitude: 0, longitude: 0, ...field[key] };

	// 		default:
	// 			return field[key];
	// 	}

	// }

}

