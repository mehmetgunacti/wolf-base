import { UUID } from "lib/constants/common.constant";
import { SyncData } from "lib/models";
import { Bookmark, Click } from "lib/models/bookmark.model";
import { Configuration } from "lib/models/configuration.model";
import { Entity, Metadata } from "lib/models/entity.model";
import { RemoteData } from "lib/models/remote.model";

export interface EntityTable<T extends Entity> {

	get(id: UUID): Promise<T | null>;

	create(item: Partial<T>): Promise<T>;
	put(item: RemoteData<T>): Promise<void>;
	update(id: UUID, item: Partial<T>): Promise<number>;
	markError(id: UUID, error: string): Promise<void>;

	list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Promise<T[]>;
	listIds(): Promise<UUID[]>;

	getSyncData(id: UUID): Promise<SyncData | null>;
	listSyncData(): Promise<SyncData[]>;

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
	get(key: string): Promise<string>;
	remove(key: string): Promise<void>;

	dump<T>(): Promise<T>;

}

export interface BookmarksTable extends EntityTable<Bookmark> {

	toggleTag(id: UUID, name: string): Promise<void>;

}

export interface ClicksTable {

	click(id: UUID): Promise<void>;
	clicked(): Promise<Click[]>;
	put(item: Click): Promise<void>;
	putAll(items: Click[]): Promise<void>;

}

export interface ConfigurationTable {

	getSyncWorkerActive(): Promise<boolean>;
	getSidebarVisible(): Promise<boolean>;
	isDarkTheme(): Promise<boolean>;

	setSyncWorkerActive(active: boolean): Promise<void>;
	setSidebarVisible(visible: boolean): Promise<void>;
	setDarkTheme(dark: boolean): Promise<void>;
	toggleTheme(): Promise<void>;

	dump(): Promise<Configuration>;

}