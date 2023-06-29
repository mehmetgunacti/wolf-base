import { SyncEvent } from 'lib/models/sync.model';
import { RemoteCollection } from 'lib/constants/remote.constant';

export const logState = (
	collection: RemoteCollection,
	message?: string,
	inProgress: boolean = true
): SyncEvent => ({
	when: new Date(),
	collection,
	message,
	inProgress
});

export const logHeader = async function* (
	collection: RemoteCollection,
	message: string,
	stars: boolean = true
  ): AsyncGenerator<SyncEvent> {

	yield logState(collection, ' ');
	if (stars)
		yield logState(collection, '**************************************************');
	yield logState(collection, message);
	if (stars)
		yield logState(collection, '**************************************************');

};
