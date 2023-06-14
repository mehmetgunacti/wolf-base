import { IDBase } from './id-base.model';

export interface SyncData<T extends Entity<T>> {

	created: string;
	updated: string;
	data?: Partial<T>;

}

export interface Entity<T extends Entity<T>> extends IDBase {

	readonly created: string;
	sync?: SyncData<T>;

}