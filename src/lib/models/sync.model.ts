import { RemoteCollection } from "lib/constants";
import { IDBase } from "./id-base.model";
import { Entity } from "./entity.model";

export interface SyncEvent {

	message?: string;
	inProgress?: boolean;

}

export interface SyncData extends IDBase {

	collection: RemoteCollection;
	createTime: string;
	updateTime: string;
	updated?: boolean;

}

export interface SyncDTO<T extends Entity> {

	syncData: SyncData,
	entity?: T

}