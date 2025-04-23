import { UUID } from '@constants/common.constant';
import { DbStore } from '@constants/database.constant';
import { LogCategory } from '@constants/log.constant';
import { IndexedDb, TransactionManager } from '@libServices/indexeddb.service';
import { Entity, Metadata } from '@models/entity.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { SyncData } from '@models/sync.model';
import { EntityLocalRepository } from '@repositories/local/entity.repository';

export abstract class EntityLocalRepositoryImpl<T extends Entity> implements EntityLocalRepository<T> {

	constructor(
		protected db: IndexedDb,
		protected table: DbStore,
		protected table_sync: DbStore,
		protected table_remote: DbStore,
		protected table_trash: DbStore,
		protected label: string
	) { }

	async getEntity(id: UUID): Promise<T | null> {

		return await this.db.read(this.table, id);

	}

	async getSyncData(id: UUID): Promise<SyncData | null> {

		return await this.db.read(this.table_sync, id);

	}

	async getRemoteMetadata(id: string): Promise<RemoteMetadata | null> {

		return await this.db.read(this.table_remote, id);

	}

	async storeDownloadedEntity(item: RemoteData<T>): Promise<RemoteData<T>> {

		await this.db.transaction('readwrite', [
			this.table,
			this.table_sync,
			this.table_trash,
			this.table_remote,
			DbStore.logs
		], async tx => {

			await this._put(tx, item);

		});
		return item;

	}

	async storeDownloadedEntities(items: RemoteData<T>[]): Promise<number> {

		await this.db.transaction('readwrite', [
			this.table,
			this.table_sync,
			this.table_trash,
			this.table_remote,
			DbStore.logs
		], async tx => {

			for (const item of items)
				await this._put(tx, item);

		});
		return items.length;

	}

	async storeMetadata(data: Metadata): Promise<void> {

		await this.db.transaction('readwrite', [
			this.table_sync,
			this.table_remote
		], async tx => {

			await tx.put<SyncData>(this.table_sync, { ...data, updated: false, deleted: false, error: null });
			await tx.put<RemoteMetadata>(this.table_remote, data);

		});

	}

	async storeOneRemoteMetadata(data: RemoteMetadata): Promise<RemoteMetadata> {

		await this.db.put(this.table_remote, data);
		return data;

	}

	async storeAllRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		await this.db.transaction('readwrite', [
			this.table_remote
		], async tx => {

			await tx.empty(this.table_remote);
			await tx.bulkPut<RemoteMetadata>(this.table_remote, data);

		});

	}

	async create(item: Partial<T>): Promise<T> {

		const newItem: T = this.newItemFromPartial(item);
		await this.db.transaction('readwrite', [
			this.table,
			DbStore.logs
		], async tx => {

			// create entity
			await tx.put<T>(this.table, newItem);

			// add log
			await this.db.add(DbStore.logs, {

				category: LogCategory.entity_created,
				date: new Date().toISOString(),
				message: `"${this.label}" created`,
				entityId: newItem.id,
				entityName: newItem.name

			});

		});
		return newItem;

	}

	async putAll(items: T[]): Promise<void> {

		for (const item of items) {

			await this.db.transaction('readwrite', [
				this.table
			], async tx => {

				// create entity
				await tx.put<T>(this.table, item);

			});

		}

	}

	async update(id: UUID, item: Partial<T>): Promise<number> {

		let count = 0;
		await this.db.transaction('readwrite', [
			this.table,
			this.table_sync,
			this.table_trash,
			DbStore.logs
		], async tx => {

			const entity = await tx.read<T>(this.table, id);
			if (entity) {

				// add to trash
				await tx.add<T>(this.table_trash, entity);

				// update entity
				const updatedEntity = await tx.modify<T>(this.table, id, { ...entity, ...item });
				if (updatedEntity !== null)
					count++;

				// update entity sync
				await tx.modify<SyncData>(this.table_sync, id, { updated: true } as Partial<SyncData>);

				// add log
				await tx.add(DbStore.logs, {

					category: LogCategory.entity_updated,
					date: new Date().toISOString(),
					message: `${this.label} updated`,
					entityId: id,
					entityName: item.name

				});

			}

		});
		return count;

	}

	async list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; } | undefined): Promise<T[]> {

		return await this.db.readAll<T>(this.table);

	}

	async listSyncData(): Promise<SyncData[]> {

		return await this.db.readAll<SyncData>(this.table_sync);

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return await this.db.readAll<RemoteMetadata>(this.table_remote);

	}

	async moveToTrash(id: UUID): Promise<void> {

		await this.db.transaction('readwrite', [
			this.table,
			this.table_sync,
			this.table_trash,
			DbStore.logs
		], async tx => {

			const entity = await tx.read<T>(this.table, id);
			if (entity) {

				await tx.add(this.table_trash, entity);
				await tx.delete(this.table, id);

			}

			await tx.modify<SyncData>(this.table_sync, id, { deleted: true } as SyncData);

			// add log
			await tx.add(DbStore.logs, {

				category: LogCategory.entity_deleted,
				date: new Date().toISOString(),
				message: `${this.label} moved to trash`,
				entityId: id,
				entityName: entity?.name ?? '[n/a]'

			});

		});

	}

	async listDeletedItems(): Promise<T[]> {

		return await this.db.readAll<T>(this.table_trash);

	}

	private async _put(tx: TransactionManager, remoteData: RemoteData<T>): Promise<void> {

		const { id, name, createTime, updateTime } = remoteData.metaData;

		// move local entity to trash
		const entity = await tx.read<T>(this.table, id);
		if (entity)
			await tx.add(this.table_trash, entity);

		// store incoming entity
		await tx.put<T>(this.table, remoteData.entity);

		// add/update 'remote'
		await tx.put<RemoteMetadata>(this.table_remote, remoteData.metaData);

		// add to sync table
		await tx.put<SyncData>(this.table_sync, {

			id,
			name,
			createTime,
			updateTime,
			updated: false,
			deleted: false,
			error: null

		});

		// add log
		await tx.add(DbStore.logs, {
			category: LogCategory.remote_data_stored,
			date: new Date().toISOString(),
			message: `"${remoteData.entity.name}" stored`,
			entityId: id,
			entityName: remoteData.entity.name
		});

	}

	async remove(id: string): Promise<UUID> {

		await this.db.transaction('readwrite', [
			this.table,
			this.table_sync,
			this.table_trash,
			this.table_remote,
			DbStore.logs
		], async tx => {

			let logMessage = 'metadata deleted';

			const item = await tx.read<T>(this.table, id);
			if (item) {

				logMessage = `"${item.name}" deleted`;
				await tx.add(this.table_trash, item);
				await tx.delete(this.table, id);

			}

			await tx.delete(this.table_sync, id);
			await tx.delete(this.table_remote, id);

			// add log
			await tx.add(DbStore.logs, {
				category: LogCategory.entity_deleted,
				date: new Date().toISOString(),
				message: logMessage,
				entityId: id,
				entityName: item?.name ?? 'n/a'
			});

		});
		return id;

	}

	async listIds(): Promise<UUID[]> {

		return await this.db.readAllKeys(this.table);

	}

	protected abstract newItemFromPartial(item: Partial<T>): T;
	protected abstract newInstance(id: UUID, item: Partial<T>): T;

}
