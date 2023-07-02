import { Action, LocalStorageService, RemoteStorageService } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { ConflictDetectedError, FatalError, MetadataList, PostService } from 'worker/utils';
import { CheckConflictsAction } from './check-conflict.action';
import { DownloadClicksAction } from './download-clicks.actions';
import { DownloadDeletedAction } from './download-deleted.action';
import { DownloadIdsAction } from './download-ids.action';
import { DownloadNewAction } from './download-new.action';
import { DownloadUpdatedAction } from './download-updated.action';
import { UploadClicksAction } from './upload-clicks.actions';
import { UploadDeletedAction } from './upload-deleted.action';
import { UploadNewAction } from './upload-new.actions';
import { UploadUpdatedAction } from './upload-updated.action';

export class BookmarksSyncAction implements Action<void, Promise<void>> {

	private actions: Action<any, any>[];
	private collection = RemoteCollection.bookmarks;

	constructor(
		protected localStorage: LocalStorageService,
		protected remoteStorage: RemoteStorageService,
		protected postService: PostService
	) {

		const remoteMetadata: MetadataList = new MetadataList();
		this.actions = [

			new CheckConflictsAction(this.localStorage, this.remoteStorage, this.postService, this.collection, remoteMetadata),
			new UploadNewAction(this.localStorage, this.remoteStorage, this.postService, this.collection, remoteMetadata),
			new DownloadIdsAction(this.localStorage, this.remoteStorage, this.postService, this.collection, remoteMetadata),
			new DownloadNewAction(this.localStorage, this.remoteStorage, this.postService, this.collection, remoteMetadata),
			new UploadDeletedAction(this.localStorage, this.remoteStorage, this.postService, this.collection, remoteMetadata),
			new DownloadDeletedAction(this.localStorage, this.remoteStorage, this.postService, this.collection, remoteMetadata),
			new UploadUpdatedAction(this.localStorage, this.remoteStorage, this.postService, this.collection, remoteMetadata),
			new DownloadUpdatedAction(this.localStorage, this.remoteStorage, this.postService, this.collection, remoteMetadata),

			// bookmarks related
			new UploadClicksAction(this.localStorage, this.remoteStorage, this.postService),
			new DownloadClicksAction(this.localStorage, this.remoteStorage, this.postService)

		]

	}

	async execute(): Promise<void> {

		try {

			for (const action of this.actions)
				await action.execute();

		} catch (error) {

			if (error instanceof ConflictDetectedError)
				await this.postService.message(this.collection, `${error.count} conflicts detected!`);

			else if (error instanceof FatalError)
				await this.postService.message(this.collection, `Fatal error!`);

			else {
				const e = error as Error;
				console.error(error);
				await this.postService.message(this.collection, `${e.message}`);
				throw error;
			}

		}

	}

}