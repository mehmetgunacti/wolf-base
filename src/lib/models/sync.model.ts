import { RemoteCollection } from "lib/constants";
import { Metadata } from "./entity.model";

export interface SyncEvent {

	when: Date;
	collection: RemoteCollection;
	message?: string;
	inProgress?: boolean;

}

export interface SyncData extends Metadata {

	updated: boolean;
	deleted: boolean;
	error: boolean;

}