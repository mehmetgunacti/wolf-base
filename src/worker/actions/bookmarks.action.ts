import { Action, ISODateString, LocalStorageService, RemoteStorageService } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { ErrorDetected, FatalError, MetadataList } from 'worker/utils';
import { CheckErrorsAction } from './check-errors.action';
import { DownloadDeletedAction } from './download-deleted.action';
import { DownloadIdsAction } from './download-ids.action';
import { DownloadNewAction } from './download-new.action';
import { DownloadUpdatedAction } from './download-updated.action';
import { UploadDeletedAction } from './upload-deleted.action';
import { UploadNewAction } from './upload-new.actions';
import { UploadUpdatedAction } from './upload-updated.action';

export class BookmarksSyncAction implements Action<void, Promise<void>> {

	private actions: Action<any, any>[];
	private collection = RemoteCollection.bookmarks;

	constructor(
		protected localStorage: LocalStorageService,
		protected remoteStorage: RemoteStorageService,
		protected syncLogId: ISODateString
	) {

		const remoteMetadata: MetadataList = new MetadataList();
		this.actions = [

			new CheckErrorsAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, remoteMetadata),
			new UploadNewAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, remoteMetadata),
			new DownloadIdsAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, remoteMetadata),
			new DownloadNewAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, remoteMetadata),
			new UploadDeletedAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, remoteMetadata),
			new DownloadDeletedAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, remoteMetadata),
			new UploadUpdatedAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, remoteMetadata),
			new DownloadUpdatedAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, remoteMetadata),

		]

	}

	async execute(): Promise<void> {

		try {

			for (const action of this.actions)
				await action.execute();

		} catch (error) {

			if (error instanceof ErrorDetected)
				await this.localStorage.syncLog.log(this.syncLogId, this.collection, `${error.count} errors!`);

			else if (error instanceof FatalError)
			await this.localStorage.syncLog.log(this.syncLogId, this.collection, `Fatal error!`);

			else {
				const e = error as Error;
				console.error(error);
				await this.localStorage.syncLog.log(this.syncLogId, this.collection, `${e.message}`);
				throw error;
			}

		}

	}

}