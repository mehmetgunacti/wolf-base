import { RemoteCollection } from "lib/constants";
import { MetaData } from "./entity.model";

export interface SyncEvent {

	when: Date;
	collection: RemoteCollection;
	message?: string;
	inProgress?: boolean;

}

export interface SyncData extends MetaData {

	updated: boolean;
	deleted: boolean;
	conflict: boolean;

}