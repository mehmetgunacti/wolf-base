import { RemoteCollection, SyncEvent } from "lib";

export class PostService {

	message(collection: RemoteCollection, message?: string, inProgress: boolean = true): void {

		postMessage({
			when: new Date(),
			collection,
			message,
			inProgress
		} as SyncEvent);

	}

	header(collection: RemoteCollection, message: string, decorate: boolean = true): void {

		this.message(collection, ' ');
		if (decorate)
			this.message(collection, '**************************************************');
		this.message(collection, message);
		if (decorate)
			this.message(collection, '**************************************************');

	}

}