import { FIRESTORE_TYPE, FIRESTORE_VALUE } from './firestore.constant';
import {
	IFirestoreDocument,
	IFirestoreDocuments,
	IFirestoreWrites,
	IFirestoreWriteResult,
	IFirestoreURLConfig,
	IFirestoreData
} from './firestore.model';
import { EntityBase, HTTP } from 'lib';

export interface IFirestoreConfig {

	apiKey: string;
	baseURL: string;
	projectId: string;

}

export class FirestoreTool {

	constructor(private conf: IFirestoreConfig) { }

	async create<T extends EntityBase>(
		url: string,
		requestBody: IFirestoreDocument<T>
	): Promise<IFirestoreData<T>> {

		return await HTTP.post<IFirestoreDocument<T>, IFirestoreDocument<T>, IFirestoreData<T>>(
			url,
			requestBody,
			(response: IFirestoreDocument<T>): IFirestoreData<T> => this.parseDocument(response)
		);

	}

	async update<T extends EntityBase>(
		url: string,
		mask: string,
		requestBody: IFirestoreDocument<T>
	): Promise<IFirestoreData<T>> {

		return HTTP.patch<IFirestoreDocument<T>, IFirestoreDocument<T>, IFirestoreData<T>>(
			`${url}&${mask}`,
			requestBody,
			(response: IFirestoreDocument<T>): IFirestoreData<T> => this.parseDocument(response)
		);

	}

	async delete(url: string): Promise<void> {

		await HTTP.delete<void, void>(url);

	}

	async list<T extends EntityBase>(url: string): Promise<IFirestoreData<T>[]> {

		let nextPageToken: string | undefined = '';
		let items: IFirestoreData<T>[] = [];

		do {

			if (nextPageToken)
				url = `${url}&pageToken=${nextPageToken}`;

			items = [
				...items,
				...await HTTP.get<IFirestoreDocuments<T>, IFirestoreData<T>[]>(
					url,
					(response: IFirestoreDocuments<T>): IFirestoreData<T>[] => {
						nextPageToken = response.nextPageToken;
						return this.parseDocuments(response);
					}
				)
			];

		} while (!!nextPageToken);

		return items;

	}

	async get<T extends EntityBase>(url: string): Promise<IFirestoreData<T>> {

		return await HTTP.get<IFirestoreDocument<T>, IFirestoreData<T>>(
			url,
			(response: IFirestoreDocument<T>) => this.parseDocument(response)
		);

	}

	async increase(collection: string, fieldPath: string, id: string, amount: number = 1): Promise<number> {

		const url = this.createURL({
			collection: '', // no collectionId (bookmarks) this time
			command: ':commit'
		});
		const requestBody: IFirestoreWrites = this.createFirestoreWrites(id, collection, fieldPath, amount);

		return await HTTP.post<IFirestoreWriteResult, IFirestoreWrites, number>(
			url,
			requestBody,
			(firebaseResponse: IFirestoreWriteResult): number => Number(firebaseResponse?.writeResults[0]?.transformResults[0]?.integerValue)
		);

	}

	createURL<T extends EntityBase>({

		baseUrl = this.conf.baseURL,
		projectId = this.conf.projectId,
		collection = '',
		document = '',
		command = '',
		apiKey = this.conf.apiKey,
		queryParameters = {}

	}: IFirestoreURLConfig<T>): string {

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

	createFirestoreWrites(id: string, collection: string, fieldPath: string, amount: number): IFirestoreWrites {

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

	parseDocuments<T extends EntityBase>(firestoreResponse: IFirestoreDocuments<T>): IFirestoreData<T>[] {

		return firestoreResponse?.documents?.map((d: IFirestoreDocument<T>) => this.parseDocument(d)) || [];

	}

	parseDocument<T extends EntityBase>(item: IFirestoreDocument<T>): IFirestoreData<T> {

		const id: string | null = this.parseId(item);
		if (id === null) {
			console.error('Firestore Object Id error : [' + JSON.stringify(item) + ']');
			throw new Error('Firestore Object Id error : [' + JSON.stringify(item) + ']');
		}

		const data = { id, ...this.parseFields(item.fields || {}) };
		const createTime = item.createTime || '';
		const updateTime = item.updateTime || '';

		return {
			id,
			data,
			created: createTime,
			updated: updateTime
		};

	}

	parseId<T extends EntityBase>(item: IFirestoreDocument<T>): string | null {

		if (item.name)
			return item.name?.substring(item.name.lastIndexOf('/') + 1);

		return null;

	}

	// tslint:disable-next-line: no-any
	parseFields(fields: Record<string, FIRESTORE_VALUE>): any {

		// tslint:disable-next-line: no-any
		const parsedObject: Record<string, any> = {};
		Object.keys(fields).forEach(key => parsedObject[key] = this.parseField(fields[key]));
		return parsedObject;

	}

	// tslint:disable-next-line: no-any
	parseField(field: Record<string, any>): any {

		const key: string = Object.keys(field)[0];

		switch (key) {

			case FIRESTORE_TYPE.doubleValue:
			case FIRESTORE_TYPE.integerValue:
				return Number(field[key]);

			case FIRESTORE_TYPE.arrayValue:
				// tslint:disable-next-line: no-any
				return (field[key] && field[key].values || []).map((v: Record<string, any>) => this.parseField(v));

			case FIRESTORE_TYPE.mapValue:
				return this.parseFields(field[key] && field[key].fields || {});

			case FIRESTORE_TYPE.geoPointValue:
				return { latitude: 0, longitude: 0, ...field[key] };

			default:
				return field[key];
		}

	}

}

