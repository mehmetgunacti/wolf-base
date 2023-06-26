import { UUID } from "lib/constants";
import { Bookmark, Click } from "lib/models/bookmark.model";
import { Entity } from "lib/models/entity.model";

export interface RemoteStorageCollection<T extends Entity> {

	downloadOne(id: string): Promise<T>;
	downloadMany(): Promise<T[]>;
	downloadIds(): Promise<Entity[]>;

	upload(item: T): Promise<T>;
	delete(id: string): Promise<void>;
	trash(item: T): Promise<void>;

}

export interface BookmarksCollection extends RemoteStorageCollection<Bookmark> {}

export interface ClicksCollection {

	increase(id: UUID, amount: number): Promise<number>;
	downloadMany(): Promise<Click[]>;

}
