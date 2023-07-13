import { ConfigurationTable } from 'lib/services/localstorage/local-storage-table.interface';
import { KeyValueTableImpl } from './key-value.table';
import { CONF_KEYS } from 'lib/constants/database.constant';
import { Configuration, Credentials } from 'lib/models/configuration.model';
import { createNBookmarks } from 'lib/utils';

export class ConfigurationTableImpl extends KeyValueTableImpl implements ConfigurationTable {

	async getSyncWorkerActive(): Promise<boolean> {

		return await this.get<boolean>(CONF_KEYS.syncWorkerActive);

	}

	async getSidebarVisible(): Promise<boolean> {

		return await this.get<boolean>(CONF_KEYS.sidebarVisible);

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

	async toggleTheme(): Promise<void> {

		return await this.toggle(CONF_KEYS.darkTheme);

	}

	async getCredentials(): Promise<Credentials> {

		const { apiKey, baseURL, projectId } = await this.dump<Configuration>();
		const credentials: Credentials = { apiKey, baseURL, projectId };
		return credentials;

	}

	async saveCredentials(credentials: Credentials): Promise<void> {

		await this.db.transaction('rw', this.db.configuration, async () => {

			await this.set(CONF_KEYS.apiKey, credentials.apiKey);
			await this.set(CONF_KEYS.baseURL, credentials.baseURL);
			await this.set(CONF_KEYS.projectId, credentials.projectId);

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
		projectId: null

	}

	async getSyncWorkerActive(): Promise<boolean> {

		return Promise.resolve(this.conf.syncWorkerActive);

	}

	async getSidebarVisible(): Promise<boolean> {

		return Promise.resolve(this.conf.sidebarVisible);

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

	async toggleTheme(): Promise<void> {

		this.conf.darkTheme = !this.conf.darkTheme;

	}

	async dump(): Promise<Configuration> {

		return this.conf;

	}

	async getCredentials(): Promise<Credentials> {

		const { apiKey, baseURL, projectId } = this.conf;
		const credentials: Credentials = { apiKey, baseURL, projectId };
		return credentials;

	}

	async saveCredentials(credentials: Credentials): Promise<void> {

		const { apiKey, baseURL, projectId } = credentials;
		this.conf.apiKey = apiKey;
		this.conf.baseURL = baseURL;
		this.conf.projectId = projectId;

	}

}