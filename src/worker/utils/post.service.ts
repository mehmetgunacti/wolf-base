import { RemoteCollection, SyncEvent, sleep } from "lib";

export interface PostService {

	message(collection: RemoteCollection, message: string, inProgress?: boolean): Promise<void>;
	header(collection: RemoteCollection, message: string, decorate?: boolean): Promise<void>;

}

export class PostServiceImpl implements PostService {

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

export class MockPostServiceImpl implements PostService {

	message(collection: RemoteCollection, message: string, inProgress?: boolean | undefined): Promise<void> {
		
		console.log(message);
		return Promise.resolve();

	}

	header(collection: RemoteCollection, message: string, decorate: boolean): Promise<void> {
		
		console.log(message);
		return Promise.resolve();

	}

}