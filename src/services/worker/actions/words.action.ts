import { ILocalStorageTable, IRemoteStorageCollection, IWord, RemoteCollection } from 'blueprints';
import { BaseSyncAction } from './base.action';

export class WordsSyncAction extends BaseSyncAction<IWord> {

	constructor(
		table: ILocalStorageTable<IWord>,
		remoteCollection: IRemoteStorageCollection<IWord>
	) {
		super(RemoteCollection.words, table, remoteCollection);
	}

}
