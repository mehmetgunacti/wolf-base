import { CONF_KEYS } from 'lib/constants/database.constant';
import { Configuration, FirestoreConfig } from 'lib/models/configuration.model';
import { ConfigurationTable } from 'lib/services/localstorage/local-storage-table.interface';
import { KeyValueTableImpl } from './key-value.table';

export class ConfigurationTableImpl extends KeyValueTableImpl implements ConfigurationTable {

	async getSyncWorkerActive(): Promise<boolean> {

		return await this.get<boolean>(CONF_KEYS.syncWorkerActive);

	}

	async getSidebarVisible(): Promise<boolean> {

		return await this.get<boolean>(CONF_KEYS.sidebarVisible);

	}

	async getTitleLookupUrl(): Promise<string | null> {
	
		return await this.get<string>(CONF_KEYS.titleLookupUrl);
		
	}

	async isDarkTheme(): Promise<boolean> {

		return await this.get<boolean>(CONF_KEYS.darkTheme);

	}

	async setSyncWorkerActive(active: boolean): Promise<void> {

		return await this.set(CONF_KEYS.syncWorkerActive, active);

	}

	async setSidebarVisible(visible: boolean): Promise<void> {

		return await this.set(CONF_KEYS.sidebarVisible, visible);

	}

	async setDarkTheme(dark: boolean): Promise<void> {

		return await this.set(CONF_KEYS.darkTheme, dark);

	}

	async setTitleLookupUrl(url: string): Promise<void> {
		
		return await this.set(CONF_KEYS.titleLookupUrl, url);

	}

	async toggleTheme(): Promise<void> {

		return await this.toggle(CONF_KEYS.darkTheme);

	}

	async getConfig(): Promise<FirestoreConfig> {

		const { apiKey, baseURL, projectId } = await this.dump<Configuration>();
		const config: FirestoreConfig = { apiKey, baseURL, projectId };
		return config;

	}

	async saveFirestoreConfig(config: FirestoreConfig): Promise<void> {

		await this.db.transaction('rw', this.db.configuration, async () => {

			await this.set(CONF_KEYS.apiKey, config.apiKey);
			await this.set(CONF_KEYS.baseURL, config.baseURL);
			await this.set(CONF_KEYS.projectId, config.projectId);

		});

	}

}

export class MockConfigurationTableImpl implements ConfigurationTable {

	private conf: Configuration = {

		darkTheme: false,
		sidebarVisible: false,
		syncWorkerActive: false,
		apiKey: null,
		baseURL: null,
		projectId: null,
		titleLookupUrl: null

	}

	async getSyncWorkerActive(): Promise<boolean> {

		return this.conf.syncWorkerActive;

	}

	async getSidebarVisible(): Promise<boolean> {

		return this.conf.sidebarVisible;

	}

	async getTitleLookupUrl(): Promise<string | null> {
		
		return this.conf.titleLookupUrl;

	}

	async isDarkTheme(): Promise<boolean> {

		return this.conf.darkTheme;

	}

	async setSyncWorkerActive(active: boolean): Promise<void> {

		this.conf.syncWorkerActive = active;

	}

	async setSidebarVisible(visible: boolean): Promise<void> {

		this.conf.sidebarVisible = visible;

	}

	async setDarkTheme(dark: boolean): Promise<void> {

		this.conf.darkTheme = dark;

	}

	async setTitleLookupUrl(url: string): Promise<void> {
		
		this.conf.titleLookupUrl = url;

	}

	async toggleTheme(): Promise<void> {

		this.conf.darkTheme = !this.conf.darkTheme;

	}

	async dump(): Promise<Configuration> {

		return this.conf;

	}

	async getConfig(): Promise<FirestoreConfig> {

		const { apiKey, baseURL, projectId } = this.conf;
		const config: FirestoreConfig = { apiKey, baseURL, projectId };
		return config;

	}

	async saveFirestoreConfig(config: FirestoreConfig): Promise<void> {

		const { apiKey, baseURL, projectId } = config;
		this.conf.apiKey = apiKey;
		this.conf.baseURL = baseURL;
		this.conf.projectId = projectId;

	}

}