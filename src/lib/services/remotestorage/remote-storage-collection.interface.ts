import { UUID } from "lib/constants/common.constant";
import { Bookmark } from "lib/models/bookmark.model";
import { Entity } from "lib/models/entity.model";

export interface RemoteStorageCollection<T extends Entity> {

	downloadOne(id: string): Promise<T>;
	downloadMany(): Promise<T[]>;
	downloadIds(): Promise<Entity[]>;

	upload(item: T): Promise<Entity>;
	delete(id: string): Promise<void>;

}

export interface BookmarksCollection extends RemoteStorageCollection<Bookmark> {

	click(id: UUID, amount: number): Promise<number>

}

export interface TrashcanCollection<T extends Entity> {

	put(item: T): Promise<void>;

}