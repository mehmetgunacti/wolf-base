import { SyncEvent } from 'lib/models/sync.model';
import { RemoteCollection } from 'lib/constants/remote.constant';

export const syncState = (
	collection: RemoteCollection,
	message?: string,
	inProgress: boolean = true
): SyncEvent => ({
	message: `${new Date()}\t[${collection}]\t${message ?? ''}`,
	inProgress
});
