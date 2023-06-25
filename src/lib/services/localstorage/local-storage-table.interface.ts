import { UUID } from "lib/constants/common.constant";
import { Bookmark, Click } from "lib/models/bookmark.model";
import { Configuration } from "lib/models/configuration.model";
import { Entity, PartialEntity } from "lib/models/entity.model";

export interface EntityTable<T extends Entity> {

	get(id: UUID): Promise<T | undefined>;

	create(item: PartialEntity<T>): Promise<T>;
	put(item: T): Promise<void>;
	update(id: UUID, item: PartialEntity<T>): Promise<T>;
	markDeleted(id: UUID): Promise<void>;
	markConflict(id: UUID): Promise<void>;
	delete(id: UUID): Promise<void>;

	list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Promise<T[]>;
	listIds(): Promise<UUID[]>;
	listEntities(): Promise<Entity[]>;

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
	put(item: Click): Promise<void>;

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