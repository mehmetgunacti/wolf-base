import { UUID } from "lib/constants/common.constant";
import { Bookmark } from "lib/models/bookmark.model";
import { Configuration } from "lib/models/configuration.model";
import { Entity } from "lib/models/entity.model";


export interface EntityTable<T extends Entity<T>> {

	get(id: UUID): Promise<T | undefined>;

	create(item: Partial<T>): Promise<T>;
	create(items: Partial<T>[]): Promise<void>;
	update(id: UUID, item: Partial<T>): Promise<T>;
	put(item: T): Promise<T>;

	delete(id: UUID): Promise<void>;

	list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Promise<T[]>;
	// list$(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Observable<T[]>;
	listIds(): Promise<UUID[]>;

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

	click(id: UUID): Promise<void>;
	toggleTag(id: UUID, name: string): Promise<void>;
	syncableItems(): Promise<Bookmark[]>;

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
