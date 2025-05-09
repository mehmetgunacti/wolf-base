import { UUID } from '@constants/common.constant';
import { Entity, Metadata } from '@models/entity.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { SyncData } from '@models/sync.model';

export interface EntityLocalRepository<T extends Entity> {

	getEntity(id: UUID): Promise<T | null>;
	getSyncData(id: UUID): Promise<SyncData | null>;
	getRemoteMetadata(id: UUID): Promise<RemoteMetadata | null>;

	storeDownloadedEntity(data: RemoteData<T>): Promise<RemoteData<T>>;
	storeDownloadedEntities(data: RemoteData<T>[]): Promise<number>;

	storeMetadata(data: Metadata): Promise<void>;

	storeOneRemoteMetadata(data: RemoteMetadata): Promise<RemoteMetadata>;
	storeAllRemoteMetadata(data: RemoteMetadata[]): Promise<void>;

	create(item: Partial<T>): Promise<T>;
	update(id: UUID, item: Partial<T>): Promise<number>;
	remove(id: UUID): Promise<UUID>;
	moveToTrash(id: UUID): Promise<void>;

	putAll(items: T[]): Promise<void>;

	list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; }): Promise<T[]>;
	listSyncData(): Promise<SyncData[]>;
	listRemoteMetadata(): Promise<RemoteMetadata[]>;
	listIds(): Promise<UUID[]>;
	listDeletedItems(): Promise<T[]>;

}
