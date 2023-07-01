import { RemoteCollection, SyncEvent, sleep } from "lib";

export class PostService {

	async message(collection: RemoteCollection, message?: string, inProgress: boolean = true): Promise<void> {

		await sleep(100);
		postMessage({
			when: new Date(),
			collection,
			message,
			inProgress
		} as SyncEvent);

	}

	async header(collection: RemoteCollection, message: string, decorate: boolean = true): Promise<void> {

		await this.message(collection, ' ');
		if (decorate)
			await this.message(collection, '**************************************************');
		await this.message(collection, message);
		if (decorate)
			await this.message(collection, '**************************************************');

	}

}