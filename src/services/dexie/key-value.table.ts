import { liveQuery } from 'dexie';
import { WolfBaseTableName } from 'lib/constants';
import { Observable, fromEventPattern } from 'rxjs';
import { KeyValueTable } from '../../lib/services/localstorage/local-storage-table.interface';
import { WolfBaseDB } from './wolfbase.database';

export class KeyValueTableImpl implements KeyValueTable {

	constructor(
		protected db: WolfBaseDB,
		protected tablename: WolfBaseTableName
	) { }

	async set<T>(key: string, value: T): Promise<void> {

		await this.db.table<T>(this.tablename).put(value, key);

	}

	async get<T>(key: string): Promise<T> {

		return await this.db.table<T>(this.tablename).get(key) as T;

	}

	get$<T>(key: string): Observable<T> {

		return fromEventPattern(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.get(key)).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		);

	}

	async remove(key: string): Promise<void> {

		return await this.db.table<string>(this.tablename).delete(key);

	}

}