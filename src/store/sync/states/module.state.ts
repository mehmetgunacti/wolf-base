import { SYNC_STATES } from 'lib';

export interface SyncState {

	status: SYNC_STATES;
	messages: string[];

}

export const initialSyncState: SyncState = {

	status: SYNC_STATES.READY,
	messages: []

};
