import {
	INote,
	ILocalStorageTable,
	RemoteCollection,
	IRemoteStorageCollection
} from 'blueprints';
import { BaseSyncAction } from './base.action';

export class NotesSyncAction extends BaseSyncAction<INote> {

	constructor(
		table: ILocalStorageTable<INote>,
		remoteCollection: IRemoteStorageCollection<INote>
	) {
		super(RemoteCollection.notes, table, remoteCollection);
	}

}
