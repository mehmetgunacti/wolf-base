import { SYNC_STATES } from "lib/constants/sync.constant";
import { Entity } from "./entity.model";

export interface SyncData<T extends Entity> {

	created: string;
	updated: string;
	data?: Partial<T>

}

export interface Syncable<T extends Entity, S extends SyncData<T>> {

	sync?: S

}

export interface SyncEvent {

	status: SYNC_STATES;
	message?: string;

}