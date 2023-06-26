import { RemoteCollection } from "lib/constants";

export interface SyncEvent {

	when: Date;
	collection: RemoteCollection;
	message?: string;
	inProgress?: boolean;

}