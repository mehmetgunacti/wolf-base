import { EntityBase, SYNC_STATES } from 'lib';

export interface SyncData<T extends EntityBase> {

	created: string;
	updated: string;
	data?: Partial<T>

}

export interface Syncable<T extends EntityBase, S extends SyncData<T>> {

	sync?: S

}

export interface SyncEvent {

	status: SYNC_STATES;
	message?: string;

}