import { Entity, WolfEntity } from "./entity.model";

export interface SyncEvent {

	message?: string;
	inProgress?: boolean;

}

export interface SyncData {

	created: string;
	updated: string;
	data?: Omit<Partial<WolfEntity>, keyof Entity>;

}