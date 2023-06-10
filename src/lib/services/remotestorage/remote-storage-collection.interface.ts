import { UUID } from "lib/constants/common.constant";
import { WolfBaseEntity } from "lib/constants/sync.constant";
import { Bookmark } from "lib/models/bookmark.model";
import { Entity } from "lib/models/entity-base.model";

export interface RemoteStorageCollection<T extends Entity> {

	get(id: string): Promise<T>;

	create(item: T): Promise<T>;
	update(id: UUID, item: Partial<WolfBaseEntity>): Promise<T>;
	delete(id: string): Promise<void>;

	list(): Promise<T[]>;
	listIds(): Promise<UUID[]>;

}

export interface BookmarksCollection extends RemoteStorageCollection<Bookmark> {

	increaseClicks(id: UUID, count: number): Promise<Bookmark>;

}