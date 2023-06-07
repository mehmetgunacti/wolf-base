import { SYNC_STATES } from 'lib/constants/sync.constant';
import { SyncEvent } from 'lib/models/sync.model';
import { RemoteCollection } from 'lib/constants/remote.constant';

export const syncState = (
	collection: RemoteCollection,
	status: SYNC_STATES,
	message: string
): SyncEvent => ({ status, message: message ? `${new Date()}\t[${collection}]\t${message}` : undefined });
