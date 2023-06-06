import { SYNC_STATES, SyncEvent } from 'lib';
import { RemoteCollection } from 'lib/constants';

export const syncState = (
	collection: RemoteCollection,
	status: SYNC_STATES,
	message: string
): SyncEvent => ({ status, message: message ? `${new Date()}\t[${collection}]\t${message}` : undefined });
