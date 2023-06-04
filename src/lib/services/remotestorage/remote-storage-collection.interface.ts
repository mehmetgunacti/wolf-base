import {
	Bookmark,
	EntityBase
} from 'lib/models';
import { IKnobaEntity, UUID } from 'lib/constants';

export interface RemoteStorageCollection<T extends EntityBase> {

	get(id: string): Promise<T>;

	create(item: T): Promise<T>;
	update(id: UUID, item: Partial<IKnobaEntity>): Promise<T>;
	delete(id: string): Promise<void>;

	list(): Promise<T[]>;
	listIds(): Promise<UUID[]>;

}

export interface BookmarksCollection extends RemoteStorageCollection<Bookmark> {

	increaseClicks(id: UUID, count: number): Promise<Bookmark>;

}