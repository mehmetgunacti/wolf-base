import { SyncData } from "lib";

export interface SyncState {

    syncData: SyncData[];
	trashCount: number;

}

export const syncInitialState: SyncState = {

	syncData: [],
	trashCount: 0

};
