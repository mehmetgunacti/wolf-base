export interface SyncModuleState {

	inProgress: boolean;
	messages: string[];
	firestoreConfigDialogVisible: boolean;

}

export const initialSyncState: SyncModuleState = {

	inProgress: false,
	messages: [],
	firestoreConfigDialogVisible: false

};