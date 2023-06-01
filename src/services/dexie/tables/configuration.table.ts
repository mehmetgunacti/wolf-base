import { liveQuery } from 'dexie';
import { CONF_KEYS, Configuration } from 'lib';
import { ConfigurationTable } from 'lib/services/localstorage/local-storage-table.interface';
import { Observable, fromEventPattern } from 'rxjs';
import { KeyValueTableImpl } from './key-value.table';

export class ConfigurationTableImpl implements ConfigurationTable {

	constructor(private kvTable: KeyValueTableImpl) { }

	async getSyncWorkerActive(): Promise<boolean> {

		return await this.kvTable.get<boolean>(CONF_KEYS.syncWorkerActive);

	}

	async getSidebarVisible(): Promise<boolean> {

		return await this.kvTable.get<boolean>(CONF_KEYS.sidebarVisible);

	}

	async isDarkTheme(): Promise<boolean> {

		return await this.kvTable.get<boolean>(CONF_KEYS.darkTheme);

	}

	async setSyncWorkerActive(active: boolean): Promise<void> {

		return await this.kvTable.set(CONF_KEYS.syncWorkerActive, active);

	}

	async setSidebarVisible(visible: boolean): Promise<void> {

		return await this.kvTable.set(CONF_KEYS.sidebarVisible, visible);

	}

	async setDarkTheme(dark: boolean): Promise<void> {

		return await this.kvTable.set(CONF_KEYS.darkTheme, dark);

	}

	async toggleTheme(): Promise<void> {
		
		return await this.kvTable.toggle(CONF_KEYS.darkTheme);

	}

	async dump(): Promise<Configuration> {

		return await this.kvTable.dump<Configuration>();

	}

	dump$(): Observable<Configuration> {

		return fromEventPattern(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.dump()).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		);

	}

}
