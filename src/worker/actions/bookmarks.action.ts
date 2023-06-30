import { Action, LocalStorageService, RemoteMetadata, RemoteStorageService, SyncEvent } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { ConflictDetectedError, FatalError, PostService } from 'worker/utils';
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

	private collection = RemoteCollection.bookmarks;
	protected remoteMetaData: RemoteMetadata[] = [];

	constructor(
		protected localStorage: LocalStorageService,
		protected remoteStorage: RemoteStorageService,
		protected postService: PostService
	) { }

	async execute(): Promise<void> {

		try {

			// order is important
			await new CheckConflictsAction(this.localStorage).execute();
			await new UploadNewAction(this.localStorage, this.remoteStorage, this.postService, this.collection).execute();
			const remoteMetadata = await new DownloadIdsAction(this.remoteStorage, this.postService, this.collection).execute();
			await new DownloadNewAction(this.localStorage, this.remoteStorage, this.postService, this.collection).execute(remoteMetadata);
			await new UploadDeletedAction(this.localStorage, this.remoteStorage, this.postService, this.collection).execute(remoteMetadata);
			await new DownloadDeletedAction(this.localStorage, this.postService, this.collection).execute(remoteMetadata);
			await new UploadUpdatedAction(this.localStorage, this.remoteStorage, this.postService, this.collection).execute(remoteMetadata);
			await new DownloadUpdatedAction(this.localStorage, this.remoteStorage, this.postService, this.collection).execute(remoteMetadata);
			await new UploadClicksAction(this.localStorage, this.remoteStorage, this.postService, this.collection).execute();
			await new DownloadClicksAction(this.localStorage, this.remoteStorage, this.postService, this.collection).execute();

		} catch (error) {

			if (error instanceof ConflictDetectedError)
				this.postService.message(this.collection, `${error.count} conflicts detected!`);

			else if (error instanceof FatalError)
				this.postService.message(this.collection, `Fatal error!`);

			else
				throw error;

		}

	}

}