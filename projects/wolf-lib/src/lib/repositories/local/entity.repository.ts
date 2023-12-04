import { UUID } from 'lib/constants';
import { Entity, Metadata, RemoteData, RemoteMetadata, SyncData } from 'lib/models';

export interface EntityLocalRepository<T extends Entity> {

	getEntity(id: UUID): Promise<T | null>;
	getSyncData(id: UUID): Promise<SyncData | null>;
	getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null>;

	storeDownloadedEntity(data: RemoteData<T>): Promise<RemoteData<T>>;
	storeDownloadedEntities(data: RemoteData<T>[]): Promise<number>;

	storeMetadata(data: Metadata): Promise<void>;

	storeRemoteMetadata(data: RemoteMetadata[]): Promise<void>;

	remove(id: UUID): Promise<UUID>;

	create(item: Partial<T>): Promise<T>;
	update(id: UUID, item: Partial<T>): Promise<number>;

	list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Promise<T[]>;
	listSyncData(): Promise<SyncData[]>;
	listRemoteMetadata(): Promise<RemoteMetadata[]>;
	listIds(): Promise<UUID[]>;

	moveToTrash(id: UUID): Promise<void>;
	listDeletedItems(): Promise<T[]>;

}
