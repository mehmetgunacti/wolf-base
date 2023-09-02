import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, concatMap, expand, map, toArray } from 'rxjs';
import { FIRESTORE_TYPE, FIRESTORE_VALUE } from './firestore.constant';
import {
	FirestoreBatchGetResponse,
	FirestoreBatchGetURL,
	FirestoreCreateURL,
	FirestoreDTO,
	FirestoreDocument,
	FirestoreDocumentURL,
	FirestoreDocuments,
	FirestoreIncreaseURL,
	FirestoreListURL,
	FirestorePatchURL,
	FirestoreWriteResult
} from './firestore.model';

export interface FirestoreAPIClient {

	create<T>(url: FirestoreCreateURL, requestBody: FirestoreDocument<T>): Observable<FirestoreDTO<T>>;
	update<T>(url: FirestorePatchURL, requestBody: FirestoreDocument<T>): Observable<FirestoreDTO<T>>;
	delete(url: FirestoreDocumentURL): Observable<void>;
	batchGet<T>(batchGetUrl: FirestoreBatchGetURL): Observable<FirestoreDTO<T>[]>;
	list<T>(listUrl: FirestoreListURL): Observable<FirestoreDTO<T>[]>;
	listIds<T>(listUrl: FirestoreListURL): Observable<FirestoreDTO<T>[]>;
	get<T>(url: FirestoreDocumentURL): Observable<FirestoreDTO<T> | null>;
	increase(url: FirestoreIncreaseURL): Observable<number>;

}

export class FirestoreAPIClientImpl implements FirestoreAPIClient {

	constructor(private http: HttpClient) { }

	create<T>(url: FirestoreCreateURL, requestBody: FirestoreDocument<T>): Observable<FirestoreDTO<T>> {

		return this.http.post<FirestoreDocument<T>>(url.toURL(), requestBody).pipe(
			map(response => this.parseDocument(response))
		);

	}

	update<T>(url: FirestorePatchURL, requestBody: FirestoreDocument<T>): Observable<FirestoreDTO<T>> {

		return this.http.patch<FirestoreDocument<T>>(url.toURL(), requestBody).pipe(
			map(response => this.parseDocument(response))
		);

	}

	delete(url: FirestoreDocumentURL): Observable<void> {

		return this.http.delete<void>(url.toURL());

	}

	batchGet<T>(url: FirestoreBatchGetURL): Observable<FirestoreDTO<T>[]> {

		return this.http.post<FirestoreBatchGetResponse<T>[]>(url.toURL(), url.toRequestBody()).pipe(
			map(response => this.parseBatchGetResponse(response))
		)

	}

	list<T>(listUrl: FirestoreListURL): Observable<FirestoreDTO<T>[]> {

		const url = listUrl.toURL();
		return this.http.get<FirestoreDocuments<T>>(url).pipe(

			expand(({ nextPageToken }) => (nextPageToken ? this.http.get<FirestoreDocuments<T>>(`${url}&pageToken=${nextPageToken}`) : EMPTY)),
			concatMap(documents => this.parseDocuments(documents)),
			toArray()

		);

	}

	listIds<T>(listUrl: FirestoreListURL): Observable<FirestoreDTO<T>[]> {

		// create url
		listUrl.onlyIds = true;
		return this.list(listUrl);

	}

	get<T>(url: FirestoreDocumentURL): Observable<FirestoreDTO<T>> {

		return this.http.get<FirestoreDocument<T>>(url.toURL()).pipe(
			map(response => this.parseDocument(response))
		);

	}

	increase(url: FirestoreIncreaseURL): Observable<number> {

		return this.http.post<FirestoreWriteResult>(url.toURL(), url.toFirestoreWrites()).pipe(
			map((firebaseResponse: FirestoreWriteResult): number => Number(firebaseResponse?.writeResults[0]?.transformResults[0]?.integerValue))
		);

	}

	private parseBatchGetResponse<T>(response: FirestoreBatchGetResponse<T>[]): FirestoreDTO<T>[] {

		return response?.filter(r => !!r.found).map((r: FirestoreBatchGetResponse<T>) => this.parseDocument(r.found)) || [];

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

		// starts parsing with /documents/[collection]/[id] until / or ? or till end of string
		const regex = /\/documents\/([^/]+)\/([^/]+)(?:\/|\?|$)/;
		const matches = url.match(regex);
		if (matches && matches.length === 3) {

			const collection = matches[1];
			const document = matches[2];
			return { collection, document };

		}
		console.error('Invalid Firestore URL: [' + url + ']', matches);
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

		// Note: some return values might have to be adjusted according to type, e.g. return Number(field. ..) etc
		if (FIRESTORE_TYPE.stringValue in field)
			return field.stringValue as T;

		if (FIRESTORE_TYPE.integerValue in field)
			return Number(field.integerValue) as T;

		if (FIRESTORE_TYPE.doubleValue in field)
			return Number(field.doubleValue) as T;

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