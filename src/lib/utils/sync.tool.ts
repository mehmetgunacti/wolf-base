import { SYNC_STATES, ISyncState } from 'lib';
import { RemoteCollection } from 'lib/constants';

export const syncState = (
	collection: RemoteCollection,
	status?: SYNC_STATES,
	message?: string
): ISyncState => ({ status, message: message ? `${new Date()}\t[${collection}]\t${message}` : undefined });
