import { Action, ISODateString, LocalStorageService, RemoteStorageService } from 'lib';
import { RemoteCollection } from 'lib/constants/remote.constant';
import { ErrorDetected, FatalError, MetadataList } from 'worker/utils';
import { DownloadClicksAction } from './download-clicks.actions';
import { UploadClicksAction } from './upload-clicks.actions';

export class BookmarksClicksSyncAction implements Action<void, Promise<void>> {

	private actions: Action<any, any>[];
	private collection: RemoteCollection = RemoteCollection.bookmarks_clicks;

	constructor(
		protected localStorage: LocalStorageService,
		protected remoteStorage: RemoteStorageService,
		protected syncLogId: ISODateString
	) {

		this.actions = [

			new UploadClicksAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, new MetadataList()),
			new DownloadClicksAction(this.localStorage, this.remoteStorage, this.syncLogId, this.collection, new MetadataList())

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