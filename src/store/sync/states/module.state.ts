import { SyncData } from "lib";

export interface SyncModuleState {

	inProgress: boolean;
	messages: string[];
	firestoreConfigDialogVisible: boolean;
	syncData: SyncData[];
	trashCount: number;

}

export const initialSyncState: SyncModuleState = {

	inProgress: false,
	messages: [],
	firestoreConfigDialogVisible: false,
	syncData: [],
	trashCount: 0

};