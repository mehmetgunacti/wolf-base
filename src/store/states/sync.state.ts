export interface SyncModuleState {

	inProgress: boolean;
	messages: string[];

}

export const initialSyncState: SyncModuleState = {

	inProgress: false,
	messages: []

};