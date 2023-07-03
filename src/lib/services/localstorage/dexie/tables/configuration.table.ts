import { ConfigurationTable } from 'lib/services/localstorage/local-storage-table.interface';
import { KeyValueTableImpl } from './key-value.table';
import { CONF_KEYS } from 'lib/constants/database.constant';
import { Configuration } from 'lib/models/configuration.model';

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

	// dump$(): Observable<Configuration> {

	// 	return fromEventPattern(

	// 		// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
	// 		// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
	// 		// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
	// 		(handler) => liveQuery(() => this.dump()).subscribe(handler),

	// 		// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
	// 		(handler, unsubscribe) => unsubscribe()

	// 	);

	// }

}

export class MockConfigurationTableImpl implements ConfigurationTable {

	private conf: Configuration = {

		darkTheme: false,
		sidebarVisible: false,
		syncWorkerActive: false

	}

	getSyncWorkerActive(): Promise<boolean> {

		return Promise.resolve(this.conf.syncWorkerActive);

	}

	getSidebarVisible(): Promise<boolean> {

		return Promise.resolve(this.conf.sidebarVisible);

	}

	isDarkTheme(): Promise<boolean> {

		return Promise.resolve(this.conf.darkTheme);

	}

	setSyncWorkerActive(active: boolean): Promise<void> {

		this.conf.syncWorkerActive = active;
		return Promise.resolve();

	}

	setSidebarVisible(visible: boolean): Promise<void> {

		this.conf.sidebarVisible = visible;
		return Promise.resolve();

	}

	setDarkTheme(dark: boolean): Promise<void> {

		this.conf.darkTheme = dark;
		return Promise.resolve();

	}

	toggleTheme(): Promise<void> {

		this.conf.darkTheme = !this.conf.darkTheme;
		return Promise.resolve();

	}

	dump(): Promise<Configuration> {
		
		return Promise.resolve(this.conf);

	}

}