import { UUID } from 'lib/constants';
import { Bookmark, Configuration, EntityBase } from 'lib/models';
import { Observable } from 'rxjs';

export interface EntityTable<T extends EntityBase> {

	get(id: UUID): Promise<T | undefined>;

	create(item: Partial<T>): Promise<T>;
	create(items: Partial<T>[]): Promise<void>;
	update(id: UUID, item: Partial<T>): Promise<T>;

	delete(id: UUID): Promise<void>;

	list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Promise<T[]>;
	list$(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Observable<T[]>;
	listIds(): Promise<UUID[]>;

	search(term: string): Promise<T[]>;
	searchByTags(tags: string[]): Promise<T[]>;

}

export interface KeyValueTable {

	set(key: string, value: string): Promise<void>;
	get(key: string): Promise<string>;
	get$(key: string): Observable<string>;
	remove(key: string): Promise<void>;

	dump<T>(): Promise<T>;

}

export interface BookmarksTable extends EntityTable<Bookmark> {

	click(id: UUID): Promise<void>;
	toggleTag(id: UUID, name: string): Promise<void>;

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
	dump$(): Observable<Configuration>;

}
