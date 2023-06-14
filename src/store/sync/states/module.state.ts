export interface SyncState {

	inProgress: boolean;
	messages: string[];

}

export const initialSyncState: SyncState = {

	inProgress: false,
	messages: []

};