import { RemoteCollection } from "lib/constants";
import { UUID } from "lib/constants/common.constant";
import { ISODateString, SyncData, SyncLog, SyncMessage, SyncMessageType } from "lib/models";
import { Bookmark, Click } from "lib/models/bookmark.model";
import { Configuration, FirestoreConfig } from "lib/models/configuration.model";
import { Entity, Metadata } from "lib/models/entity.model";
import { RemoteData, RemoteMetadata } from "lib/models/remote.model";

export interface EntityTable<T extends Entity> {

	get(id: UUID): Promise<T | null>;

	create(item: Partial<T>): Promise<T>;
	put(item: RemoteData<T>): Promise<void>;
	putAll(items: RemoteData<T>[]): Promise<void>;
	update(id: UUID, item: Partial<T>): Promise<number>;
	markError(id: UUID, error: string): Promise<void>;

	list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Promise<T[]>;
	listIds(): Promise<UUID[]>;

	getSyncData(id: UUID): Promise<SyncData | null>;
	listSyncData(): Promise<SyncData[]>;

	getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null>;
	listRemoteMetadata(): Promise<RemoteMetadata[]>;
	putRemoteMetadata(data: RemoteMetadata[]): Promise<void>;

	getTrashItem(id: UUID): Promise<T | null>;

	listNewIds(): Promise<UUID[]>;
	listErrors(): Promise<SyncData[]>;
	listUpdated(): Promise<SyncData[]>;

	moveToTrash(id: UUID): Promise<void>;
	listDeletedItems(): Promise<T[]>;
	deletePermanently(id: UUID): Promise<void>;

	// todo eliminate these methods
	filterNew(entities: Metadata[]): Promise<Metadata[]>;
	filterUpdated(entities: Metadata[]): Promise<Metadata[]>;
	filterDeleted(entities: Metadata[]): Promise<SyncData[]>;

	search(term: string): Promise<T[]>;
	searchByTags(tags: string[]): Promise<T[]>;

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
	clicked(): Promise<Click[]>;
	put(item: Click): Promise<void>;
	putAll(items: Click[]): Promise<void>;
	list(): Promise<Click[]>;

}

export interface ConfigurationTable {

	setSidebarVisible(visible: boolean): Promise<void>;
	setTitleLookupUrl(url: string): Promise<void>;
	setFirestoreConfig(config: FirestoreConfig): Promise<void>;

	toggleTheme(): Promise<void>;

	getFirestoreConfig(): Promise<FirestoreConfig | null>;
	getConfiguration(): Promise<Configuration>;

}

export interface SyncLogsTable {

	create(): Promise<SyncLog>;
	finish(id: ISODateString, result: string): Promise<void>;
	list(): Promise<SyncLog[]>;
	clear(): Promise<void>;

	title(id: ISODateString, collection: RemoteCollection, message: string): Promise<void>;
	subtitle(id: ISODateString, collection: RemoteCollection, message: string): Promise<void>;
	log(id: ISODateString, collection: RemoteCollection, message: string, type?: SyncMessageType): Promise<void>;

	messages(syncLogId: ISODateString): Promise<SyncMessage[]>;

}