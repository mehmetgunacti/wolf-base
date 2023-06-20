import { UUID } from "lib/constants/common.constant";
import { SyncDTO, SyncData, Trash } from "lib/models";
import { Bookmark } from "lib/models/bookmark.model";
import { Entity } from "lib/models/entity.model";

export interface RemoteStorageCollection<T extends Entity> {

	downloadOne(id: string): Promise<SyncDTO<T>>;
	downloadMany(): Promise<SyncDTO<T>[]>;
	downloadIds(): Promise<SyncData[]>;

	upload(item: T): Promise<SyncData>;
	delete(id: string): Promise<void>;

}

export interface BookmarksCollection extends RemoteStorageCollection<Bookmark> {

	click(id: UUID, amount: number): Promise<number>

}

export interface TrashcanCollection {

	put(item: Trash): Promise<void>;

}