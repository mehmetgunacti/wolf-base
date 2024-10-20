import { UUID } from '@constants';
import { IdBase } from '@models';

export interface TransactionManager {

	add<T>(storeName: string, item: Partial<T>): Promise<T>;
	bulkPut<T extends IdBase>(storeName: string, entities: T[]): Promise<void>;
	count(storeName: string): Promise<number>;
	delete(storeName: string, id: UUID): Promise<void>;
	dump(storeName: string): Promise<Record<string, any>>;
	empty(storeName: string): Promise<void>;
	modify<T extends IdBase>(storeName: string, id: UUID, data: Partial<T>): Promise<T | null>;
	put<T extends IdBase>(storeName: string, entity: T): Promise<void>;
	read<T extends IdBase>(storeName: string, id: UUID): Promise<T | null>;
	readAll<T>(storeName: string): Promise<T[]>;
	readAllKeys(storeName: string): Promise<UUID[]>;
	readValue<T>(storeName: string, key: string): Promise<T>;
	setValue<T>(storeName: string, key: string, value: T): Promise<void>;
	size(storeName: string): Promise<number>;

}

export interface IndexedDb extends TransactionManager {

	transaction<T>(

		mode: IDBTransactionMode,
		stores: string[],
		operations: (tx: TransactionManager) => Promise<T>

	): Promise<T>;

}
