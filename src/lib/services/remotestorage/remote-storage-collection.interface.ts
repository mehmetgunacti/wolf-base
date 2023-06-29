import { UUID } from "lib/constants";
import { RemoteData, RemoteMetaData } from "lib/models";
import { Bookmark, Click } from "lib/models/bookmark.model";
import { Entity } from "lib/models/entity.model";

export interface RemoteStorageCollection<T extends Entity> {

	downloadOne(id: UUID): Promise<RemoteData<T> | null>;
	downloadMany(): Promise<RemoteData<T>[]>;
	downloadIds(): Promise<RemoteMetaData[]>;

	upload(item: T): Promise<RemoteData<T>>;
	delete(id: UUID): Promise<void>;
	moveToTrash(id: UUID): Promise<void>;
	trash(item: T): Promise<void>;

}

export interface BookmarksCollection extends RemoteStorageCollection<Bookmark> { }

export interface ClicksCollection {

	increase(id: UUID, amount: number): Promise<number>;
	downloadMany(): Promise<Click[]>;

}
