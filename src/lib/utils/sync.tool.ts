import { SyncEvent } from 'lib/models/sync.model';
import { RemoteCollection } from 'lib/constants/remote.constant';

export const syncState = (
	collection: RemoteCollection,
	message?: string,
	inProgress: boolean = true
): SyncEvent => ({
	when: new Date(),
	collection,
	message,
	inProgress
});

export const syncHeader = async function* (
	collection: RemoteCollection,
	message: string,
	stars: boolean = true
  ): AsyncGenerator<SyncEvent> {

	yield syncState(collection, ' ');
	if (stars)
		yield syncState(collection, '**************************************************');
	yield syncState(collection, message);
	if (stars)
		yield syncState(collection, '**************************************************');

};
