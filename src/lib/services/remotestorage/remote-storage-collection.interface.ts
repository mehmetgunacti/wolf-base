import { UUID } from "lib/constants/common.constant";
import { WolfBaseEntity } from "lib/constants/sync.constant";
import { Bookmark } from "lib/models/bookmark.model";
import { Entity } from "lib/models/entity.model";

export interface RemoteStorageCollection<T extends Entity<T>> {

	get(id: string): Promise<T>;

	create(item: T): Promise<T>;
	update(id: UUID, item: Partial<WolfBaseEntity>): Promise<T>;
	delete(id: string): Promise<void>;

	list(onlyIds?: boolean): Promise<T[]>;

}

export interface BookmarksCollection extends RemoteStorageCollection<Bookmark> {

	increaseClicks(id: UUID, count: number): Promise<Bookmark>;

}