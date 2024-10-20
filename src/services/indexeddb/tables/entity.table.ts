import { AppEntity, DbStore, LogCategory } from '@constants';
import { IndexedDb, TransactionManager } from '@libServices';
import { UUID } from 'lib/constants/common.constant';
import { RemoteData, RemoteMetadata, SyncData } from 'lib/models';
import { Entity, Metadata } from 'lib/models/entity.model';
import { EntityLocalRepository } from 'lib/repositories/local';

export abstract class EntityLocalRepositoryImpl<T extends Entity> implements EntityLocalRepository<T> {

	constructor(
		protected db: IndexedDb,
		protected appEntity: AppEntity
	) { }

	async getEntity(id: UUID): Promise<T | null> {

		return await this.db.read(this.appEntity.table, id);

	}

	async getSyncData(id: UUID): Promise<SyncData | null> {

		return await this.db.read(this.appEntity.table_sync, id);

	}

	async getRemoteMetadata(id: string): Promise<RemoteMetadata | null> {

		return await this.db.read(this.appEntity.table_remote, id);

	}

	async storeDownloadedEntity(item: RemoteData<T>): Promise<RemoteData<T>> {

		await this.db.transaction('readwrite', [
			this.appEntity.table,
			this.appEntity.table_sync,
			this.appEntity.table_trash,
			this.appEntity.table_remote,
			DbStore.logs
		], async tx => {

			await this._put(tx, item);

		});
		return item;

	}

	async storeDownloadedEntities(items: RemoteData<T>[]): Promise<number> {

		await this.db.transaction('readwrite', [
			this.appEntity.table,
			this.appEntity.table_sync,
			this.appEntity.table_trash,
			this.appEntity.table_remote,
			DbStore.logs
		], async tx => {

			for (const item of items)
				await this._put(tx, item);

		});
		return items.length;

	}

	async storeMetadata(data: Metadata): Promise<void> {

		await this.db.transaction('readwrite', [
			this.appEntity.table_sync,
			this.appEntity.table_remote
		], async tx => {

			await tx.put<SyncData>(this.appEntity.table_sync, { ...data, updated: false, deleted: false, error: null });
			await tx.put<RemoteMetadata>(this.appEntity.table_remote, data);

		});

	}

	async storeOneRemoteMetadata(data: RemoteMetadata): Promise<RemoteMetadata> {

		await this.db.put(this.appEntity.table_remote, data);
		return data;

	}

	async storeAllRemoteMetadata(data: RemoteMetadata[]): Promise<void> {

		await this.db.transaction('readwrite', [
			this.appEntity.table_remote
		], async tx => {

			await tx.empty(this.appEntity.table_remote);
			await tx.bulkPut<RemoteMetadata>(this.appEntity.table_remote, data);

		});

	}

	async create(item: Partial<T>): Promise<T> {

		const newItem: T = this.newItemFromPartial(item);
		await this.db.transaction('readwrite', [
			this.appEntity.table,
			DbStore.logs
		], async tx => {

			// create entity
			await tx.put<T>(this.appEntity.table, newItem);

			// add log
			await this.db.add(DbStore.logs, {

				category: LogCategory.entity_created,
				date: new Date().toISOString(),
				message: `"${this.appEntity.label}" created`,
				entityId: newItem.id,
				entityName: newItem.name

			});

		});
		return newItem;

	}

	async update(id: UUID, item: Partial<T>): Promise<number> {

		let count = 0;
		await this.db.transaction('readwrite', [
			this.appEntity.table,
			this.appEntity.table_sync,
			this.appEntity.table_trash,
			DbStore.logs
		], async tx => {

			const entity = await tx.read<T>(this.appEntity.table, id);
			if (entity) {

				await tx.add<T>(this.appEntity.table_trash, entity);
				await tx.modify<T>(this.appEntity.table, id, { ...entity, ...item });
				await tx.modify<SyncData>(this.appEntity.table_sync, id, { updated: true } as Partial<SyncData>);

				// add log
				await tx.add(DbStore.logs, {

					category: LogCategory.entity_updated,
					date: new Date().toISOString(),
					message: `${this.appEntity.label} updated`,
					entityId: id,
					entityName: item.name

				});

			}

		});
		return count;

	}

	async list(params?: { orderBy?: string; reverse?: boolean; limit?: number; filterFn?: (t: T) => boolean; } | undefined): Promise<T[]> {

		return await this.db.readAll<T>(this.appEntity.table);

	}

	async listSyncData(): Promise<SyncData[]> {

		return await this.db.readAll<SyncData>(this.appEntity.table_sync);

	}

	async listRemoteMetadata(): Promise<RemoteMetadata[]> {

		return await this.db.readAll<RemoteMetadata>(this.appEntity.table);

	}

	async moveToTrash(id: UUID): Promise<void> {

		await this.db.transaction('readwrite', [
			this.appEntity.table,
			this.appEntity.table_sync,
			this.appEntity.table_trash,
			DbStore.logs
		], async tx => {

			const entity = await tx.read<T>(this.appEntity.table, id);
			if (entity) {

				await tx.add(this.appEntity.table_trash, entity);
				await tx.delete(this.appEntity.table, id);

			}

			await tx.modify<SyncData>(this.appEntity.table_sync, id, { deleted: true } as SyncData);

			// add log
			await tx.add(DbStore.logs, {

				category: LogCategory.entity_deleted,
				date: new Date().toISOString(),
				message: `${this.appEntity.label} moved to trash`,
				entityId: id,
				entityName: entity?.name ?? '[n/a]'

			});

		});

	}

	async listDeletedItems(): Promise<T[]> {

		return await this.db.readAll<T>(this.appEntity.table_trash);

	}

	private async _put(tx: TransactionManager, remoteData: RemoteData<T>): Promise<void> {

		const { id, name, createTime, updateTime } = remoteData.metaData;

		// move local entity to trash
		const entity = await tx.read<T>(this.appEntity.table, id);
		if (entity)
			await tx.add(this.appEntity.table_trash, entity);

		// store incoming entity
		await tx.put<T>(this.appEntity.table, remoteData.entity);

		// add/update 'remote'
		await tx.put<RemoteMetadata>(this.appEntity.table_remote, remoteData.metaData);

		// add to sync table
		await tx.put<SyncData>(this.appEntity.table_sync, {

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
			this.appEntity.table,
			this.appEntity.table_sync,
			this.appEntity.table_trash,
			this.appEntity.table_remote,
			DbStore.logs
		], async tx => {

			let logMessage = 'metadata deleted';

			const item = await tx.read<T>(this.appEntity.table, id);
			if (item) {

				logMessage = `"${item.name}" deleted`;
				await tx.add(this.appEntity.table_trash, item);
				await tx.delete(this.appEntity.table, id);

			}

			await tx.delete(this.appEntity.table_sync, id);
			await tx.delete(this.appEntity.table_remote, id);

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

		return await this.db.readAllKeys(this.appEntity.table);

	}

	protected abstract newItemFromPartial(item: Partial<T>): T;
	protected abstract newInstance(id: UUID, item: Partial<T>): T;

}
