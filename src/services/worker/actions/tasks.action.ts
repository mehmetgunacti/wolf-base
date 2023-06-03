import {
	ILocalStorageTable,
	IRemoteStorageCollection,
	ITaskList,
	RemoteCollection
} from 'blueprints';
import { BaseSyncAction } from './base.action';

export class TasksSyncAction extends BaseSyncAction<ITaskList> {

	constructor(
		table: ILocalStorageTable<ITaskList>,
		remoteCollection: IRemoteStorageCollection<ITaskList>
	) {
		super(RemoteCollection.tasks, table, remoteCollection);
	}

}
