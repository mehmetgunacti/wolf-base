import { UUID } from "lib/constants/common.constant";
import { LogMessage, SyncData } from "lib/models";
import { Bookmark, Click } from "lib/models/bookmark.model";
import { Configuration, FirestoreConfig } from "lib/models/configuration.model";
import { Entity, Metadata } from "lib/models/entity.model";
import { RemoteData, RemoteMetadata } from "lib/models/remote.model";

export interface EntityTable<T extends Entity> {

	getEntity(id: UUID): Promise<T | null>;
	getSyncData(id: UUID): Promise<SyncData | null>;

	storeRemoteData(data: RemoteData<T>[]): Promise<number>;

	/** stores metadata to _sync and _remote tables. Adds log entry. */
	storeMetadata(data: Metadata): Promise<void>;

	/** stores metadata to _remote table. No log entry */
	storeRemoteMetadata(data: RemoteMetadata[]): Promise<void>;

	/** moves entity to _trash, deletes _sync and _remote, adds log */
	delete(id: UUID): Promise<number>;
	/** moves entity to _trash, deletes _sync and _remote, adds log */
	bulkDelete(ids: UUID[]): Promise<number>;

	create(item: Partial<T>): Promise<T>;
	update(id: UUID, item: Partial<T>): Promise<number>;

	list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Promise<T[]>;
	listSyncData(): Promise<SyncData[]>;
	listRemoteMetadata(): Promise<RemoteMetadata[]>;
	listIds(): Promise<UUID[]>;

	moveToTrash(id: UUID): Promise<void>;
	listDeletedItems(): Promise<T[]>;

}

export interface KeyValueTable {

	set(key: string, value: string): Promise<void>;
	get<T>(key: string): Promise<T | null>;
	remove(key: string): Promise<void>;

	dump(): Promise<Map<string, any>>;

}

export interface BookmarksTable extends EntityTable<Bookmark> {

	toggleTag(id: UUID, name: string): Promise<void>;

}

export interface ClicksTable {

	click(id: UUID): Promise<void>;
	storeClicks(items: Click[]): Promise<number>;
	listAll(): Promise<Click[]>;
	listClicked(): Promise<Click[]>;

}

export interface ConfigurationTable {

	setSidebarVisible(visible: boolean): Promise<void>;
	setTitleLookupUrl(url: string): Promise<void>;
	setFirestoreConfig(config: FirestoreConfig): Promise<void>;

	toggleTheme(): Promise<void>;

	getFirestoreConfig(): Promise<FirestoreConfig | null>;
	getConfiguration(): Promise<Configuration>;

}

export interface LogsTable {

	add(message: LogMessage): Promise<void>;
	list(): Promise<LogMessage[]>;
	clear(): Promise<void>;

}