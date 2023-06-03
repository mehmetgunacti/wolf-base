import { SYNC_STATES, SyncState } from 'lib';
import { RemoteCollection } from 'lib/constants';

export const syncState = (
	collection: RemoteCollection,
	status?: SYNC_STATES,
	message?: string
): SyncState => ({ status, message: message ? `${new Date()}\t[${collection}]\t${message}` : undefined });
